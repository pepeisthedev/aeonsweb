#!/bin/bash

# Directory containing the images
dir="./public/reveal"

# Salt for hashing
salt="explore art with aeons"

# Iterate over all files in the directory
for file in "$dir"/*; do
    # Get the file extension
    ext="${file##*.}"

    # Get the filename without the extension
    filename=$(basename -- "$file")
    filename="${filename%.*}"

    # Calculate the SHA256 hash of the filename with the salt
    hash=$(echo -n "${filename}${salt}" | openssl dgst -sha256 | awk '{print $2}')

    # Rename the file to its hash value, preserving the file extension
    mv -- "$file" "$dir/$hash.$ext"
done