/*
 * Android Manifest: android:windowSoftInputMode="adjustResize"
 */

/*
Somewhere else in your code
*/
RelativeLayout mainLayout = findViewById(R.layout.main_layout); // You must use the layout root
        InputMethodManager im = (InputMethodManager) getSystemService(Service.INPUT_METHOD_SERVICE);

/*
Instantiate and pass a callback
*/
        SoftKeyboard softKeyboard;
        softKeyboard = new SoftKeyboard(mainLayout, im);
        softKeyboard.setSoftKeyboardCallback(new SoftKeyboard.SoftKeyboardChanged()
        {

@Override
public void onSoftKeyboardHide()
        {
        // 키보드가 숨겨질 때
        }

@Override
public void onSoftKeyboardShow()
        {
        // 키보드가 보여질 때
        alert('ddddddddd');
        }
        });

/*
Open or close the soft keyboard easily
*/
        softKeyboard.openSoftKeyboard();
        softKeyboard.closeSoftKeyboard();

/* Prevent memory leaks:
 */
@Override
public void onDestroy()
        {
        super.onDestroy();
        softKeyboard.unRegisterSoftKeyboardCallback();
        }
