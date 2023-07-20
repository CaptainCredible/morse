let AButtonlistenerIsActive = false;
let BButtonlistenerIsActive = false;
let pinListenerIsActive = false;
let morseBeepTimerExists = false;
let morseTimer = 0;
let beepIsOn = false;
let blinkIsOn = false;


//% weight=100 color=#01bc11 icon=""
//% groups="['Input', 'Output']"
//%blockId="Morse" block="Morse"
namespace Morse {

    /**
     * While pin is connected to GND
     * @While pin is connected to GND
     */
    //% blockId="whilePinIsConnectedToGND" block="while pin $whatPin is connected to GND"
    //% weight=400
    //% group="Input"
    export function whilePinIsConnectedToGND(whatPin: DigitalPin, body: () => void) {
        if (!pinListenerIsActive) {
            pins.setPull(whatPin, PinPullMode.PullUp)
            loops.everyInterval(5, function () {
                if (pins.digitalReadPin(whatPin) == 0) {
                    control.raiseEvent(202, 202);
                } else {
                    control.raiseEvent(202, 203);
                }
            })
            pinListenerIsActive = true // make sure we dont set up multiple listeners
        }
        control.onEvent(202, 202, body);
    }


    /**
     * While pin is disconnected from GND
     * @While pin is disconnected from GND
     */
    //% blockId="whilePinIsDisconnectedFromGND" block="while pin $whatPin is disconnected from GND"
    //% weight=399
    //% advanced=true
    //% group="Input"
    export function whilePinIsDisconnectedFromGND(whatPin: DigitalPin, body: () => void) {
        if (!pinListenerIsActive) {
            pins.setPull(whatPin, PinPullMode.PullUp)
            loops.everyInterval(5, function () {
                if (pins.digitalReadPin(whatPin) == 0) {
                    control.raiseEvent(202, 202);
                } else {
                    control.raiseEvent(202, 203);
                }
            })
            pinListenerIsActive = true // make sure we dont set up multiple listeners
        }
        control.onEvent(202, 203, body);
    }


    /**
     * While Button A is held
     * @While button A is held
     */
    //% blockId="whileButtonAIsHeld" block="while button A is held"
    //% weight=200
    //% group="Input"
    export function whileButtonAisHeld(body: () => void) {
        if (!AButtonlistenerIsActive) {
            loops.everyInterval(5, function () {
                if (runningInSim()) {
                    if (input.buttonIsPressed(Button.A)) {
                        control.raiseEvent(101, 101);
                    } else {
                        control.raiseEvent(101, 102);
                    }
                } else {
                    if (pins.digitalReadPin(DigitalPin.P5) == 0) {
                        control.raiseEvent(101, 101);
                    } else {
                        control.raiseEvent(101, 102);
                    }
                }
            })
            AButtonlistenerIsActive = true // make sure we dont set up multiple listeners
        }
        control.onEvent(101, 101, body);
    }

    

    /**
     * While Button A is released
     * @While button A is released
     */
    //% blockId="whileButtonAIsReleased" block="while button A is released"
    //% weight=199
    //% advanced=true
    //% group="Input"
    export function whileButtonAisReleased(body: () => void) {
        if (!AButtonlistenerIsActive) {
            loops.everyInterval(5, function () {
                if (runningInSim()) {
                    if (input.buttonIsPressed(Button.A)) {
                        control.raiseEvent(101, 101);
                    } else {
                        control.raiseEvent(101, 102);
                    }
                } else {
                    if (pins.digitalReadPin(DigitalPin.P5) == 0) {
                        control.raiseEvent(101, 101);
                    } else {
                        control.raiseEvent(101, 102);
                    }
                }
            })
            AButtonlistenerIsActive = true // make sure we dont set up multiple listeners
        }
        control.onEvent(101, 102, body);
    }

    /**
         * While Button B is held
         * @While button B is held
         */
    //% blockId="whileButtonBIsHeld" block="while button B is held"
    //% weight=190
    //% group="Input"
    export function whileButtonBisHeld(body: () => void) {
        if (!BButtonlistenerIsActive) {
            loops.everyInterval(5, function () {
                if (runningInSim()) {
                    if (input.buttonIsPressed(Button.B)) {
                        control.raiseEvent(103, 103);
                    } else {
                        control.raiseEvent(103, 104);
                    }
                } else {
                    if (pins.digitalReadPin(DigitalPin.P11) == 0) {
                        control.raiseEvent(103, 103);
                    } else {
                        control.raiseEvent(103, 104);
                    }
                }
            })
            BButtonlistenerIsActive = true // make sure we dont set up multiple listeners
        }
        control.onEvent(103, 103, body);
    }


    /**
     * While Button B is released
     * @While button B is released
     */
    //% blockId="whileButtonBIsReleased" block="while button B is released"
    //% weight=189
    //% advanced=true
    //% group="Input"
    export function whileButtonBisReleased(body: () => void) {
        if (!BButtonlistenerIsActive) {
            loops.everyInterval(5, function () {
                if (runningInSim()) {
                    if (input.buttonIsPressed(Button.B)) {
                        control.raiseEvent(103, 103);
                    } else {
                        control.raiseEvent(103, 104);
                    }
                } else {
                    if (pins.digitalReadPin(DigitalPin.P11) == 0) {
                        control.raiseEvent(103, 103);
                    } else {
                        control.raiseEvent(103, 104);
                    }
                }
            })
            BButtonlistenerIsActive = true // make sure we dont set up multiple listeners
        }
        control.onEvent(103, 104, body);
    }

    /**
     * Make morse beep
     * @Make morse beep
     */
    //% blockId="makeMorseBeep" block="make morse beep $freq Hz"
    //% freq.defl=880
    //% weight=100
    //% group="Output"
    export function makeMorseBeep(freq: number) {
        if(!beepIsOn){
            music.ringTone(freq)
            beepIsOn = true;
        }
        morseTimer = input.runningTime();
        if (!morseBeepTimerExists) {
            morseBeepTimerExists = true;
            loops.everyInterval(10, function () {
                if ((input.runningTime() > morseTimer + 15) && beepIsOn) {
                    music.stopAllSounds()
                    beepIsOn = false;
                }
            })
        }
    }

    /**
     * Make morse blink
     * @Make morse blink
     */
    //% blockId="makeMorseBlink" block="make morse blink"
    //% freq.defl=880
    //% weight=95
    //% group="Output"
    export function makeMorseBlink() {
        blinkTimer = input.runningTime();
        led.plotAll();
        if(!blinkIsOn){
            //console.log("plotted LEDs")
            blinkIsOn = true;
        }
        if (!morseBlinkTimerExists) {
            morseBlinkTimerExists = true;
            loops.everyInterval(20, function () {
                if ((input.runningTime() > blinkTimer + 20) && blinkIsOn) {
                    //console.log(input.runningTime() + " is bigger than " + (blinkTimer + 1000))
                    basic.clearScreen()
                    blinkIsOn = false
                }
            })
        }
    }

} //end of namespace

let blinkTimer = 0;
let morseBlinkTimerExists = false;




function runningInSim() {
    if (pins.digitalReadPin(DigitalPin.P20) == 1) {
        return false
    } else {
        return true
    }
}
