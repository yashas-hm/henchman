source $(readlink -f constants.sh)

MENU() {
  INDICATOR="<"
  SELECTED=1
  OPTIONS=$@
  LENGTH=$#


  PRINT_MENU() {
    clear

    LOGO

    echo -e $GREET
    echo -e "Please choose from one: $YELLOW(use arrow keys)$DEFAULT_COLOR"

    for (( i=1;i<=(($LENGTH-1));i++ ))
    do
      if [ $SELECTED -eq $i ]
      then
        echo -n "${OPTIONS[$i]}"
        echo -e " $GREEN$INDICATOR$DEFAULT_COLOR"
      else
        echo "${OPTIONS[$i]}"
      fi
    done
  }

  PRINT_MENU

  while read -rsn1 input
  do
    case $input in
      "A")
        if [ $SELECTED -lt 2 ]
        then
          SELECTED=$(($LENGTH-1))
        else
          SELECTED=$(($SELECTED-1))
        fi
        PRINT_MENU
       ;;
      "B")
        if [ $SELECTED -gt $(($LENGTH-2)) ]
        then
          SELECTED=1
        else
          SELECTED=$(($SELECTED+1))
        fi
        PRINT_MENU
       ;;
      "") return $SELECTED ;;
    esac
  done
}

PATH_SETUP(){
  SETUP=$1
  echo -e $GREET
  
  echo "Enter file path where to run the function"
  echo "Leave empty to run in current folder."
  if [ -z $SETUP ]
  then
    echo "${YELLOW}If the folder doesn't exist Henchman will create one$DEFAULT_COLOR"
  fi
  echo -e "Enter ${RED}q$DEFAULT_COLOR to Abort."
  echo "Enter Path:"

  read SETUPPATH

  if [[ $SETUPPATH == "q" ]]
  then
    echo -e "\n🧌 $HENCHMAN: Aborting!!"
    echo -e $BYE
    exit 1
  elif [ ! -z $SETUPPATH ]
  then
    if [ ! -d $SETUPPATH ]
    then
      if [  -z $1 ] && [ -z $SETUP ]
      then
        mkdir "$SETUPPATH"
      else
        echo -e "🧌 $HENCHMAN: Directory not found"
        exit 1;
      fi
    fi

    cd "$SETUPPATH"
  fi
}