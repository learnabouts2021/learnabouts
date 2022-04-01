
/**
 * Blocks for driving the Kitronik Motor Driver Board
                                                          
  

             
                   
    	
                   
       
 

   
            	
 */
//% weight=100 color=#0fbc11 icon=""
namespace learn_about_motor {
    export enum MotorDirection {
        //% block="forward"
        Forward,
        //% block="reverse"
        Reverse
    }

    export enum Motors {
        //%blockId=learn_about_motor_one
        //% block="motor 1"
        Motor1,
        //%blockId=learn_about_motor_two
        //% block="motor 2"
        Motor2
    }
    /**
     * Turns on motor specified by eMotors in the direction specified
     * by eDirection, at the requested speed 
     *
     * @param motor which motor to turn on
     * @param dir   which direction to go
     * @param speed how fast to spin the motor
     */
    //% blockId=learn_about_motordriver_motor_on
    //% block="%motor|on direction %dir|speed %speed"
    //% speed.min=0 speed.max=100
    export function motorOn(motor: Motors, dir: MotorDirection, speed: number): void {
        /*first convert 0-100 to 0-1024 (approx) We wont worry about the lsat 24 to make life simpler*/
        let OutputVal = Math.clamp(0, 100, speed) * 10;

        switch (motor) {
            case Motors.Motor1: /*Motor 1 uses Pins 13 and 14*/
                switch (dir) {
                    case MotorDirection.Forward:
                        pins.analogWritePin(AnalogPin.P13, OutputVal);
                        pins.digitalWritePin(DigitalPin.P14, 0); /*Write the low side digitally, to allow the 3rd PWM to be used if required elsewhere*/
                        break
                    case MotorDirection.Reverse:
                        pins.analogWritePin(AnalogPin.P14, OutputVal);
                        pins.digitalWritePin(DigitalPin.P13, 0);
                        break
                }

                break;
            case Motors.Motor2: /*Motor 2 uses Pins 15 and 16*/
                switch (dir) {
                    case MotorDirection.Forward:
                        pins.analogWritePin(AnalogPin.P15, OutputVal);
                        pins.digitalWritePin(DigitalPin.P16, 0); /*Write the low side digitally, to allow the 3rd PWM to be used if required elsewhere*/
                        break
                    case MotorDirection.Reverse:
                        pins.analogWritePin(AnalogPin.P16, OutputVal);
                        pins.digitalWritePin(DigitalPin.P15, 0);
                        break
                }

                break;
        }
    }
    /**
     * Turns off the motor specified by eMotors
     * @param motor :which motor to turn off
     */
    //% blockId=learn_about_motor_off
    //%block="turn off %motor"
    export function motorOff(motor: Motors): void {
        switch (motor) {
            case Motors.Motor1:
                pins.digitalWritePin(DigitalPin.P13, 0);
                pins.digitalWritePin(DigitalPin.P14, 0);
                break
            case Motors.Motor2:
                pins.digitalWritePin(DigitalPin.P15, 0);
                pins.digitalWritePin(DigitalPin.P16, 0);
                break
        }
    }
}
