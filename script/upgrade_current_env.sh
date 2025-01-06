#!/usr/bin/env bash
# haiqinma - 20241106 - first version

set -u
set -o pipefail

SCRIPT_PATH=$(cd "$(dirname "$0")" || exit 1;pwd)
CODE_PATH=$(cd "${SCRIPT_PATH}"/.. || exit 1;pwd)

COLOR_RED='\033[1;31m'
COLOR_NC='\033[0m'


default_branch="main"
index=1
echo -e "\nstep $index -- get latest code from branch[$default_branch]"
pushd "${CODE_PATH}" || exit 2
git checkout  -- .
git pull origin "$default_branch"

echo -e "show latest 3 git commits-------->>>>>>>>"
git log -3 | cat
echo -e "show latest 3 git commits<<<<<<<<--------"

index=$((index+1))
echo -e "\nstep $index -- npm install"
if [[ -d node_modules ]]
then
	rm -rf node_modules
fi
npm config set registry https://registry.npmmirror.com
sleep 2
npm install

index=$((index+1))
echo -e "\nstep $index -- compile package file"
if [[ -d dist ]]
then
	rm -rf dist
fi
npm run build
sleep 2
if [[ ! -d dist ]]
then
	echo -e "${COLOR_RED}compile yeying-portal faild ${COLOR_NC}"
	exit 3
fi


sleep 2
index=$((index+1))
echo -e "\nstep $index -- update nginx static files"
if [[ ! -d /usr/share/nginx/html/ ]]
then
	echo -e "${COLOR_RED}there is no directory for nginx static files ${COLOR_NC}"
	exit 4
fi
if [[  -d /usr/share/nginx/html/dist ]]
then
	rm -rf /usr/share/nginx/html/dist
fi
cp -rf dist /usr/share/nginx/html/
cp -f index.html /usr/share/nginx/html/

sleep 2
index=$((index+1))
echo -e "\nstep $index -- reload nginx"
sudo nginx -s reload

echo -e "\nThis is the end of upgrade yeying-portal. $(date)"
