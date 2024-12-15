source $(readlink -f core/constants.sh)
source $(readlink -f core/utils.sh)

START_ANDROID_EMULATOR() {
  echo -e "🧌 $HENCHMAN: Happy to Help!\n"
  echo -e "🧌 $HENCHMAN: Starting Android Simulator\n"

  OUTPUT=()
  while IFS= read -r line; do
      OUTPUT+=("$line")
  done < <(emulator -list-avds)
  
  EMULATOR=${OUTPUT[1]}

  emulator "@$EMULATOR"

  echo -e "🧌 $HENCHMAN: Task complete!"
  echo -e "🧌 $HENCHMAN: Bye, have a great day."
}

START_IOS_EMULATOR(){
  echo -e "🧌 $HENCHMAN: Happy to Help!\n"
  echo -e "🧌 $HENCHMAN: Starting iOS Simulator\n"

  open -a simulator

  echo -e "🧌 $HENCHMAN: Task complete!"
  echo -e "🧌 $HENCHMAN: Bye, have a great day."
}

# PostgreSQL Functions
START_PSQL(){
  echo -e "🧌 $HENCHMAN: Happy to Help!\n"

  echo -e "🧌 $HENCHMAN: Starting PostgreSQL Server\n"

  echo "Remember to stop postgresql service using \"brew services stop postgresql\" or henchman stop psql"
  brew services start postgresql

  sleep 1
  echo -e "🧌 $HENCHMAN: Server Started"
  echo -e "🧌 $HENCHMAN: Starting psql"

  psql postgres
}

START() {
  if [[ -z $1 ]]
  then
    declare -a OPTIONS=(
      [0]=""
      [1]="PostgreSQL Server"
      [2]="Android Emulator"
      [3]="iOS Emulator"
      [4]="Exit"
    )
    MENU "${OPTIONS[@]}"
    CHOICE=$?

    case $CHOICE in
      "1") START_PSQL ;;
      "2") START_ANDROID_EMULATOR ;;
      "3") START_IOS_EMULATOR ;;
      "4") echo -e "🧌 $HENCHMAN: Bye, have a great day." ;;
      *) echo -e "🧌 $HENCHMAN: Invalid choice choose again." ;;
    esac
  elif [[ $1  == "-h" || $1 == "--help" ]]
  then
    echo -e "🧌 $HENCHMAN: Happy to Help!\n"
    echo "Available Commands:"
    echo -e "\nStart PostgreSQL Server"
    echo "Start postgreSql server using the following command - henchman start psql"
    echo -e "\nStart Simulator"
    echo "Start simulator using the following command - henchman start sim"
    echo -e "$RED\nBy default the iOS simulator will be started if no flag is passed\n$DEFAULT_COLOR"
    echo "Flags:"
    echo "-a or --android   --> Start Android Simulator"
    echo "-i or --ios       --> Start iOS Simulator"
  elif [[ $1 == "sim" ]]
  then
    if [[ $2 == "--android" || $2 == "-a" ]]
    then
      START_ANDROID_EMULATOR
    elif [[ $2 == "--ios" || $2 == "-i" ]]
    then
      START_IOS_EMULATOR
    else
      START_IOS_EMULATOR
    fi
  elif [[ $1 == "psql" ]]
  then
    START_PSQL
  else
    echo -e "🧌 $HENCHMAN: Command Invalid. Type \"henchman start -h\" or \"henchman start --help\" to get to know about commands"
  fi
}