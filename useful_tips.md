# Useful tips on creating, maintaining, and updating repository


## Reuploading .csv files to database
First and foremost, keep a copy of all of your normalized data tables as .csv files on your computer. The .csv files are easy to update and can be reuploaded to the database without changing any of the queries.

``` sql
TRUNCATE TABLE specimens RESTART IDENTITY CASCADE; [removes old data, prevents duplicates, resets IDs]

[Below is used to reupload the .csv file make sure the path is correct for the specific .csv you wish to upload]

COPY specimens (
  id,
  field_number,
  collector,
  collection_date
)
FROM LOCAL 'specimens.csv'
CSV HEADER;
