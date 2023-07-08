let AButtonlistenerIsActive = false;

//% weight=100 color=#01bc11 icon=""
//%blockId="Morse" block="Morse"
namespace Morse {
    /**
     * Setup pin pulse duration
     * @While button A is held
     */
    //% blockId="whileButtonAIsHeld" block="while button A is held"
    export function whileButtonAisHeld(note: number, body: () => void) {
        if(!AButtonlistenerIsActive){
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
}

function runningInSim() {
    if (pins.digitalReadPin(DigitalPin.P20) == 1) {
        return false
    } else {
        return true
    }
}
