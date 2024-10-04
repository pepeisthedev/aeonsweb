#!/bin/bash

# Directory containing the images
dir="./aeons"

# Counter
count=1

# Iterate over all files in the directory
for file in "$dir"/*.png; do
    # Get the file extension
    ext="${file##*.}"

    # Rename the file to its count value, preserving the file extension
    mv -- "$file" "$dir/$count.$ext"

    # Increment the counter
    ((count++))
done