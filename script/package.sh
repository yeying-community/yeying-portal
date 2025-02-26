#!/usr/bin/env bash

script_dir=$(cd "$(dirname "$0")" || exit;pwd)

work_dir=$(
  cd "${script_dir}"/.. || exit 1
  pwd
)

version=1.0.0

if [ -n "$1" ]; then
  version="$1"
fi


function record_version_information() {
  local recode_file=$1
  echo -e "\n========branch information:" | tee "$recode_file"
  git branch --show-current | tee -a "$recode_file"
  echo -e "\n========commit log information:" >> "$recode_file"
  git log -3 | grep -v Author | tee -a "$recode_file"
  echo -e "\n====Finished" | tee -a "$recode_file"
}


dist_dir=${work_dir}/dist

index=1
echo -e "\nstep $index -- This is going to generate package for yeying-portal"
output_dir=${work_dir}/output
if [ -d "${output_dir}" ]; then
  rm -rf "${output_dir}"
fi


index=$((index+1))
echo -e "\nstep $index -- prepare package files under directroy: ${output_dir}"
package_name=yeying-portal-${version}
file_name=$package_name.tar.gz
portal_dir=${output_dir}/${package_name}
mkdir -p "${portal_dir}"


index=$((index+1))
echo -e "\nstep $index -- copy necessary file to  ${portal_dir}"
if [ ! -d "${dist_dir}" ]; then
  echo -e "please execute 'npm run build' before package!"
  exit 1;
fi
cp -rf "${dist_dir}" "${portal_dir}"/
formatted_date=$(date '+%Y%m%d_%H%M%S')
VERSION_FILE="version_information_$formatted_date"
record_version_information "$VERSION_FILE"
mv "$VERSION_FILE" "${portal_dir}"/


sleep 1
index=$((index+1))
echo -e "\nstep $index -- generate package file"
pushd "${output_dir}" || exit 2
tar -zcf "${file_name}" "${package_name}"
rm -rf "${package_name}"
popd  || exit 2


index=$((index+1))
echo -e "\nstep $index -- package : ${file_name} under [ ${output_dir} ] is ready. $(date)"