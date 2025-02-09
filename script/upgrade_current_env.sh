#!/usr/bin/env bash
# haiqinma - 20241103 - first version
# haiqinma - 20250209 - change to used on yeying.pub host

set -e # exit when there is an error
set -u
set -o pipefail


COLOR_RED='\033[1;31m'
COLOR_NC='\033[0m'

TARGET_DIR="/opt/deploy"

index=1
echo -e "\nstep $index -- This is going to upgrade yeying-portal package"
pushd "$TARGET_DIR"

filename=$(ls yeying-portal-*.tar.gz)
echo -e "\nget package file name:$filename"
temp=${filename#yeying-portal-}      # 去掉 "yeying-portal-"
package_version=${temp%.tar.gz}  # 去掉 ".tar.gz"
echo -e "\nPackage version is:$package_version"

index=$((index+1))
echo -e "\nstep $index -- untar package(tar.gz)"
tar -zxf "yeying-portal-$package_version.tar.gz"


sleep 2
index=$((index+1))
echo -e "\nstep $index -- update nginx static files"
pushd "yeying-portal-$package_version"
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
cp -f dist/index.html /usr/share/nginx/html/
popd
popd

sleep 2
index=$((index+1))
echo -e "\nstep $index -- reload nginx service"
nginx -s reload


echo -e "\nThis is the end of upgrade yeying-portal. $(date)"