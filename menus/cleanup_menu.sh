source $(readlink -f core/constants.sh)
source $(readlink -f core/utils.sh)

CLEAN_FLUTTER_PROJECTS() {
  PATH_SETUP --cleanup

  echo -e "🧌 $HENCHMAN: Cleaning all flutter projects"

  for directory in *;
  do
    if [[ -d "$directory" ]]
    then
      cd "$directory"
      echo -e "🧌 $HENCHMAN: Cleaning flutter project in $directory"
      flutter clean build
      cd ..
    fi
  done

  echo -e "🧌 $HENCHMAN: Project cleanup complete"
  echo -e "🧌 $HENCHMAN: Bye, have a great day."
}

CLEAN_NODE_PROJECTS() {
  PATH_SETUP --cleanup

  echo -e "🧌 $HENCHMAN: Cleaning all node projects"

  for directory in *;
  do
    if [[ -d "$directory" ]]
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

CLEANUP_MENU() {
  if [[ -z $1 ]]
  then
    declare -a OPTIONS=(
      [0]=""
      [1]="Flutter cleanup"
      [2]="Node cleanup"
      [3]="Exit"
    )
    MENU "${OPTIONS[@]}"
    CHOICE=$?

    case $CHOICE in
      "1") CLEAN_FLUTTER_PROJECTS;;
      "2") CLEAN_NODE_PROJECTS;;
      "3") echo -e "🧌 $HENCHMAN: Bye, have a great day." ;;
      *) echo -e "🧌 $HENCHMAN: Invalid choice choose again." ;;
    esac
  elif [[ $1  == "-h" || $1 == "--help" ]]
  then
    echo -e "🧌 $HENCHMAN: Happy to Help!\n"
    echo "Available Commands:"
    echo -e "\nFlutter"
    echo "Clean unwanted files from all flutter sub-directories using this command - henchman clean flutter"
    echo -e "\nNode"
    echo "Clean unwanted files from all node sub-directories using this command - henchman clean node"
  elif [[ $1 == "flutter" ]]
  then
    CLEAN_FLUTTER_PROJECTS
  elif [[ $1 == "node" ]]
  then
    CLEAN_NODE_PROJECTS
  else
    echo "🧌 $HENCHMAN: Command Invalid. Type \"henchman clean -h\" or \"henchman clean --help\" to get to know about commands"
  fi
}