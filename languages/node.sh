source $(readlink -f core/utils.sh)
source $(readlink -f core/constants.sh)

CLEAN_NODE_MODULES() {
  PATH_SETUP --cleanup

  echo -e "🧌 $HENCHMAN: Cleaning all node projects"

  for directory in *;
  do
    if [ -d "$directory" ]
    then
      cd "$directory"
      echo -e "🧌 $HENCHMAN: Cleaning node project in $directory"
      rm -rf ./node_modules
      cd ..
    fi
  done

  echo -e "🧌 $HENCHMAN: Project cleanup complete"
  echo -e "🧌 $HENCHMAN: Bye, have a great day."
}