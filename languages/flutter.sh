source $(readlink -f core/utils.sh)
source $(readlink -f core/constants.sh)

CLEAN_FLUTTER_BUILD() {
  PATH_SETUP --cleanup

  echo -e "🧌 $HENCHMAN: Cleaning all flutter projects"

  for directory in *;
  do
    if [ -d "$directory" ]
    then
      cd "$directory"
      echo -e "🧌 $HENCHMAN: Cleaning flutter project in $directory"
      flutter clean build
      cd ..
    fi
  done

  echo -e "🧌 $HENCHMAN: Project cleanup complete"
  echo -e $BYE
}

