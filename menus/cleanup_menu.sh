source $(readlink -f core/constants.sh)
source $(readlink -f core/utils.sh)
source $(readlink -f languages/node.sh)
source $(readlink -f core/flutter.sh)

CLEANUP_MENU() {
  if [ -z $1 ]
  then
    declare -a OPTIONS=(
      [0]=""
      [1]="Flutter Cleanup"
      [2]="Node Cleanup"
      [3]="Python Cleanup"
      [4]="Exit"
    )
    MENU "${OPTIONS[@]}"
    CHOICE=$?

    case $CHOICE in
      "1") CLEAN_FLUTTER_BUILD;;
      "2") CLEAN_NODE_MODULES;;
      "3") CLEAN_PYTHON_VENV;;
      "4") echo -e "🧌 $HENCHMAN: Bye, have a great day." ;;
      *) echo -e "🧌 $HENCHMAN: Invalid choice choose again." ;;
    esac
  elif [ $1  == "-h" || $1 == "--help" ]
  then
    echo -e "🧌 $HENCHMAN: Happy to Help!\n"
    echo "Available Commands:"
    echo -e "\nFlutter"
    echo "Clean unwanted build files from all flutter sub-directories using this command - henchman clean flutter"
    echo -e "\nNode"
    echo "Clean unwanted node_modules from all node sub-directories using this command - henchman clean node"
    echo -e "\nPython"
    echo "Clean unwanted venv from all python sub-directories using this command - henchman clean python"
  elif [ $1 == "flutter" ]
  then
    CLEAN_FLUTTER_BUILD
  elif [ $1 == "node" ]
  then
    CLEAN_NODE_MODULES
  elif [ $1 == "python" ]
  then
    CLEAN_PYTHON_VENV
  else
    echo "🧌 $HENCHMAN: Command Invalid. Type \"henchman clean -h\" or \"henchman clean --help\" to get to know about commands"
  fi
}