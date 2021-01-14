#Code sign
reference : NAS\05. 개인폴더\★★퇴사자\신연종\app\앱배포\APK_Upload.docx
1. jarsigner - 코드 사이닝
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ibd.keystore app-release-unsigned.apk(빌드된 apk) inPHRibd(앱 이름)
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore symApp-release-key.keystore app-release-unsigned.apk symApp


2. zipalign - 보관 파일 정렬 도구
zipalign -v 4 ibd.apk(코드 사인 apk) ibd_release_20200717.apk(정렬된 apk)
zipalign -v 4 app-release-unsigned.apk symApp.apk




keytool -genkey -v -keystore symApp-release-key.keystore -alias symApp -keyalg RSA -keysize 2048 -validity 10000


