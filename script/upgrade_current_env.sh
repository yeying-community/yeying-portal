#!/usr/bin/env bash
# haiqinma - 20241103 - first version
# haiqinma - 20250209 - change to used on yeying.pub host

set -e # exit when there is an error
set -u
set -o pipefail


COLOR_RED='\033[1;31m'
COLOR_NC='\033[0m'

function record_version_information() {
  local recode_file=$1
  echo -e "\n========branch information:" | tee "$recode_file"
  git branch --show-current | tee -a "$recode_file"
  echo -e "\n========commit log information:" >> "$recode_file"
  git log -3 | grep -v Author | tee -a "$recode_file"
  echo -e "\n====Finished" | tee -a "$recode_file"
}


LOG_FILE="/opt/deploy/logs/yeying-portal-upgrade.log"
MAX_FILESIZE=10485760    # 10MB in bytes
if [ -f "$LOG_FILE" ]
then
	FILE_SIZE=$(stat -c%s "$LOG_FILE")
	if [ "$FILE_SIZE" -gt "$MAX_FILESIZE" ]
	then
		echo "" > LOG_FILE
		echo "Log file was larger than $MAX_FILESIZE. Cleared the log file at $(date)" | tee -a "$LOG_FILE"
	fi
else
	mkdir -p /opt/deploy/logs/
	touch $LOG_FILE
fi

SCRIPT_PATH=$(cd "$(dirname "$0")" || exit;pwd)
CODE_PATH="$SCRIPT_PATH/.."

index=1
echo -e "\nstep $index -- This is going to get latest code $(date)" | tee -a  "$LOG_FILE"
pushd "$CODE_PATH"
BRANCH_NAME="main"
git reset --hard HEAD
git checkout "$BRANCH_NAME"
git pull origin "$BRANCH_NAME"
current_status="/tmp/current_status"
record_version_information "$current_status"
popd

flag_upgrade=true
TARGET_DIR="/opt/deploy"
if [ -d "${TARGET_DIR}"/yeying-portal ];then
	deployed_package_version_info=$(find "$TARGET_DIR"/yeying-portal -name "version_information*")
	echo -e "get deploy package version information as: ${deployed_package_version_info} " | tee -a "$LOG_FILE"
    if [[ -f "$deployed_package_version_info" ]]; then
			compare_result=$(diff "$deployed_package_version_info" "$current_status")
			echo -e "version difference is: $compare_result " | tee -a "$LOG_FILE"
			if [ -z "$compare_result" ]; then
				flag_upgrade=false
			fi
	fi
fi

if [ ! "$flag_upgrade" ]; then
	echo -e "there is no code update compared with deployed package $(date)" | tee -a "$LOG_FILE"
	exit 0
fi


index=$((index+1))
echo -e "\nstep $index -- compile yeying-portal package" | tee -a "$LOG_FILE"
pushd "$CODE_PATH"
npm install
npm run build
bash script/package.sh 2>&1 
popd

index=$((index+1))
echo -e "\nstep $index -- copy yeying-portal package to /opt/deploy"  | tee -a "$LOG_FILE"
if [ -d "${TARGET_DIR}"/yeying-portal ]; then
	rm -rf "${TARGET_DIR}"/yeying-portal
fi
rm -f "${TARGET_DIR}"/yeying-portal-*.tar.gz
compiled_package=$(find "$CODE_PATH/output" -name "yeying-portal-*.tar.gz")
echo -e "get compiled package: $compiled_package"  | tee -a "$LOG_FILE"
if [ -f "$compiled_package" ]; then
	cp -a "$compiled_package" "${TARGET_DIR}"
else
	echo -e "there is no package to upgrade" | tee -a "$LOG_FILE"
	exit 1
fi


index=$((index+1))
echo -e "\nstep $index -- this is going to upgrade yeying-portal package"  | tee -a "$LOG_FILE"
pushd "$TARGET_DIR"

filename=$(ls yeying-portal-*.tar.gz)
echo -e "\nget package file name:$filename"  | tee -a "$LOG_FILE"
temp=${filename#yeying-portal-}      # 去掉 "yeying-portal-"
package_version=${temp%.tar.gz}  # 去掉 ".tar.gz"
echo -e "\nPackage version is:$package_version" | tee -a "$LOG_FILE"

index=$((index+1))
echo -e "\nstep $index -- untar package(tar.gz)" | tee -a "$LOG_FILE"
tar -zxf "yeying-portal-$package_version.tar.gz"
mv "yeying-portal-$package_version" yeying-portal

sleep 2
index=$((index+1))
echo -e "\nstep $index -- update nginx static files" | tee -a "$LOG_FILE"
if [[ ! -d /usr/share/nginx/html/ ]];then
	echo -e "${COLOR_RED}there is no directory for nginx static files ${COLOR_NC}" | tee -a "$LOG_FILE"
	exit 4
fi
if [[  -d /usr/share/nginx/html/dist ]]; then
	rm -rf /usr/share/nginx/html/dist
fi
cp -rf "${TARGET_DIR}"/yeying-portal/dist /usr/share/nginx/html/
#cp -f dist/index.html /usr/share/nginx/html/
popd

sleep 2
index=$((index+1))
echo -e "\nstep $index -- reload nginx service" | tee -a "$LOG_FILE"
nginx -s reload


echo -e "\nThis is the end of upgrade yeying-portal. $(date)" | tee -a "$LOG_FILE"