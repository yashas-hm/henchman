source $(readlink -f core/utils.sh)
source $(readlink -f core/constants.sh)

CLEAN_PYTHON_VENV() {
  PATH_SETUP --cleanup

  echo -e "🧌 $HENCHMAN: Cleaning all python projects"

  for directory in *;
  do
    if [ -d "$directory" ]
    then
      cd "$directory"
      if [ -d venv ]
      then
        echo -e "🧌 $HENCHMAN: Freezing pip in $directory"
        source venv/bin/active
        pip3 freeze > requirements.txt
        deactivate
        echo -e "🧌 $HENCHMAN: Cleaning python project in $directory"
        rm -rf ./venv
        cd ..
      else
        echo -e "🧌 $HENCHMAN: venv not found in $directory"
      fi  
    fi
  done

  echo -e "🧌 $HENCHMAN: Project cleanup complete"
  echo -e "🧌 $HENCHMAN: Bye, have a great day."
}

