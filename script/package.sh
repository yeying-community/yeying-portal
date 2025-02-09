#!/usr/bin/env bash

script_dir=$(
  cd $(dirname "$0") || exit 1
  pwd
)

work_dir=$(
  cd "${script_dir}"/.. || exit 1
  pwd
)

version=1.0.0

if [ ! -z "$1" ]; then
  version="$1"
fi

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


sleep 1
index=$((index+1))
echo -e "\nstep $index -- generate package file"
pushd "${output_dir}" || exit 2
tar -zcf "${file_name}" "${package_name}"
rm -rf "${package_name}"
popd  || exit 2


index=$((index+1))
echo -e "\nstep $index -- package : ${file_name} under [ ${output_dir} ] is ready. $(date)"