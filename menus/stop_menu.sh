source $(readlink -f core/constants.sh)
source $(readlink -f core/utils.sh)

STOP_PSQL(){
  echo -e "🧌 $HENCHMAN: Happy to Help!\n"

  brew services stop postgresql
  sleep 1
  echo -e "🧌 $HENCHMAN: PostgreSQL server stopped."
  echo -e "🧌 $HENCHMAN: Bye, have a great day."
}

STOP() {
  if [ -z $1 ]
  then
    declare -a OPTIONS=(
      [0]=""
      [1]="Stop PostgreSQL Server"
      [2]="Exit"
    )
    MENU "${OPTIONS[@]}"
    CHOICE=$?

    case $CHOICE in
      "1") STOP_PSQL ;;
      "2") echo -e "🧌 $HENCHMAN: Bye, have a great day." ;;
      *) echo -e "🧌 $HENCHMAN: Invalid choice choose again." ;;
    esac
  elif [ $1  == "-h" || $1 == "--help" ]
  then
    echo -e "🧌 $HENCHMAN: Happy to Help!\n"
    echo "Available Commands:"
    echo -e "\nPostgreSQL Server"
    echo "Stop the running PostgreSQL Server using the following command - henchman stop psql"
  elif [ $1 == "psql" ]
  then
    STOP_PSQL
  else
    echo "🧌 $HENCHMAN: Command Invalid. Type \"henchman stop -h\" or \"henchman stop --help\" to get to know about commands"
  fi
}