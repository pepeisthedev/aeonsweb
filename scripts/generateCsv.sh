#!/bin/bash

# Define the output file
output_file="whitelist.csv"

# Write the header to the file
echo "Discord ID,VIP,FCFS" > $output_file

# Loop 20000 times
for i in $(seq 1 20000)
do
    # Generate a random Discord ID
    discord_id="user$i"

    # Generate a random 61-character string for the wallet address, prepend with "bc1"
    wallet_address="bc1$(openssl rand -hex 30)"

    # Write the row to the file
    echo "$discord_id,$wallet_address,$wallet_address" >> $output_file
done