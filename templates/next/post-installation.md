## Important notes after installation

Firebase messaging is added to the project, however it will _not_ work properly
until you add your own google-services.json and GoogleService-Info.plist files
to the project.

You can get these files by creating a Firebase project at https://firebase.google.com/
and adding an Android and iOS app to the project. The package name for Android
should match the package name defined while bootstraping the project.
