

# Specify the common source files
$commonSourceFiles = @(".\database.py", ".\model.py", ".\utils.py")

# Specify the source files for each zip file
$mchSourceFiles = @(".\machine_lambda.py") + $commonSourceFiles
$schSourceFiles = @(".\schedule_lambda.py") + $commonSourceFiles
$mchSchSourceFiles = @(".\mch_sch_lambda.py") + $commonSourceFiles

# Specify the destination zip files
$mchZipFile = "..\zip\machine_lambda.zip"
$schZipFile = "..\zip\schedule_lambda.zip"
$mchSchZipFile = "..\zip\mch_sch_lambda.zip"

# Function to create a zip file
function Create-ZipFile {
    param (
        [string[]]$SourceFiles,
        [string]$ZipFile
    )

    # Create the zip file
    Compress-Archive -Force -Path $SourceFiles -DestinationPath $ZipFile
}

# Create each zip file
Create-ZipFile -SourceFiles $mchSourceFiles -ZipFile $mchZipFile
Create-ZipFile -SourceFiles $schSourceFiles -ZipFile $schZipFile
Create-ZipFile -SourceFiles $mchSchSourceFiles -ZipFile $mchSchZipFile
