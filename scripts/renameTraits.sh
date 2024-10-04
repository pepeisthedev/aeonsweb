#!/bin/bash

# Define the folder to search files in
folder_path="../public/metadata/"

# Arrays of strings to find and replace
find_strings=("background" "specialty" "skin" "topMiscellaneous" "mouth" "head" "eyes" "png")
replace_strings=("Background" "Specialty" "Skin" "Miscellaneous" "Mouth" "Head" "Eyes" "webp")

# Ensure both arrays have the same length
if [ ${#find_strings[@]} -ne ${#replace_strings[@]} ]; then
  echo "Error: Arrays find_strings and replace_strings must have the same length."
  exit 1
fi

# Loop through all files in the specified folder
for file in "$folder_path"/*; do
  # Check if the file is a regular file
  if [ -f "$file" ]; then
    # Loop through all elements in the arrays
    for (( i=0; i<${#find_strings[@]}; i++ )); do
      # Use sed to replace the string in the file
      # -i'' edits the file in place without backup
      sed -i'' "s/${find_strings[$i]}/${replace_strings[$i]}/g" "$file"
    done
  fi
done