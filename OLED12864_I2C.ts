/**
* makecode I2C OLED 128x64 扩展.
* From microbit/micropython Chinese community.
* http://www.micropython.org.cn
*/
/**手势传感器 */
enum DIR {
    DIR_NONE,
    DIR_LEFT,
    DIR_RIGHT,
    DIR_UP,
    DIR_DOWN,
    DIR_NEAR,
    DIR_FAR,
    DIR_ALL
}
enum STATE {
    NA_STATE,
    NEAR_STATE,
    FAR_STATE,
    ALL_STATE
}
enum GESTURE_TYPE {
    //% block=无
    None = 0,
    //% block=向下
    Right = 1,
    //% block=向上
    Left = 2,
    //% block=向右
    Up = 3,
    //% block=向左
    Down = 4,
    //% block=向前
    Forward = 5,
    //% block=向后
    Backward = 6
}


//% weight=20 color=#0855AA icon="O" block="OLED12864_I2C"
namespace OLED12864_I2C {
    let color = 1;
    let font: number[] = [];
    font[0] = 0x0022d422;
    font[1] = 0x0022d422;
    font[2] = 0x0022d422;
    font[3] = 0x0022d422;
    font[4] = 0x0022d422;
    font[5] = 0x0022d422;
    font[6] = 0x0022d422;
    font[7] = 0x0022d422;
    font[8] = 0x0022d422;
    font[9] = 0x0022d422;
    font[10] = 0x0022d422;
    font[11] = 0x0022d422;
    font[12] = 0x0022d422;
    font[13] = 0x0022d422;
    font[14] = 0x0022d422;
    font[15] = 0x0022d422;
    font[16] = 0x0022d422;
    font[17] = 0x0022d422;
    font[18] = 0x0022d422;
    font[19] = 0x0022d422;
    font[20] = 0x0022d422;
    font[21] = 0x0022d422;
    font[22] = 0x0022d422;
    font[23] = 0x0022d422;
    font[24] = 0x0022d422;
    font[25] = 0x0022d422;
    font[26] = 0x0022d422;
    font[27] = 0x0022d422;
    font[28] = 0x0022d422;
    font[29] = 0x0022d422;
    font[30] = 0x0022d422;
    font[31] = 0x0022d422;
    font[32] = 0x00000000;
    font[33] = 0x000002e0;
    font[34] = 0x00018060;
    font[35] = 0x00afabea;
    font[36] = 0x00aed6ea;
    font[37] = 0x01991133;
    font[38] = 0x010556aa;
    font[39] = 0x00000060;
    font[40] = 0x000045c0;
    font[41] = 0x00003a20;
    font[42] = 0x00051140;
    font[43] = 0x00023880;
    font[44] = 0x00002200;
    font[45] = 0x00021080;
    font[46] = 0x00000100;
    font[47] = 0x00111110;
    font[48] = 0x0007462e;
    font[49] = 0x00087e40;
    font[50] = 0x000956b9;
    font[51] = 0x0005d629;
    font[52] = 0x008fa54c;
    font[53] = 0x009ad6b7;
    font[54] = 0x008ada88;
    font[55] = 0x00119531;
    font[56] = 0x00aad6aa;
    font[57] = 0x0022b6a2;
    font[58] = 0x00000140;
    font[59] = 0x00002a00;
    font[60] = 0x0008a880;
    font[61] = 0x00052940;
    font[62] = 0x00022a20;
    font[63] = 0x0022d422;
    font[64] = 0x00e4d62e;
    font[65] = 0x000f14be;
    font[66] = 0x000556bf;
    font[67] = 0x0008c62e;
    font[68] = 0x0007463f;
    font[69] = 0x0008d6bf;
    font[70] = 0x000094bf;
    font[71] = 0x00cac62e;
    font[72] = 0x000f909f;
    font[73] = 0x000047f1;
    font[74] = 0x0017c629;
    font[75] = 0x0008a89f;
    font[76] = 0x0008421f;
    font[77] = 0x01f1105f;
    font[78] = 0x01f4105f;
    font[79] = 0x0007462e;
    font[80] = 0x000114bf;
    font[81] = 0x000b6526;
    font[82] = 0x010514bf;
    font[83] = 0x0004d6b2;
    font[84] = 0x0010fc21;
    font[85] = 0x0007c20f;
    font[86] = 0x00744107;
    font[87] = 0x01f4111f;
    font[88] = 0x000d909b;
    font[89] = 0x00117041;
    font[90] = 0x0008ceb9;
    font[91] = 0x0008c7e0;
    font[92] = 0x01041041;
    font[93] = 0x000fc620;
    font[94] = 0x00010440;
    font[95] = 0x01084210;
    font[96] = 0x00000820;
    font[97] = 0x010f4a4c;
    font[98] = 0x0004529f;
    font[99] = 0x00094a4c;
    font[100] = 0x000fd288;
    font[101] = 0x000956ae;
    font[102] = 0x000097c4;
    font[103] = 0x0007d6a2;
    font[104] = 0x000c109f;
    font[105] = 0x000003a0;
    font[106] = 0x0006c200;
    font[107] = 0x0008289f;
    font[108] = 0x000841e0;
    font[109] = 0x01e1105e;
    font[110] = 0x000e085e;
    font[111] = 0x00064a4c;
    font[112] = 0x0002295e;
    font[113] = 0x000f2944;
    font[114] = 0x0001085c;
    font[115] = 0x00012a90;
    font[116] = 0x010a51e0;
    font[117] = 0x010f420e;
    font[118] = 0x00644106;
    font[119] = 0x01e8221e;
    font[120] = 0x00093192;
    font[121] = 0x00222292;
    font[122] = 0x00095b52;
    font[123] = 0x0008fc80;
    font[124] = 0x000003e0;
    font[125] = 0x000013f1;
    font[126] = 0x00841080;
    font[127] = 0x0022d422;

    let _I2CAddr = 60;
    let _screen = pins.createBuffer(1025);
    let _buf2 = pins.createBuffer(2);
    let _buf3 = pins.createBuffer(3);
    let _buf4 = pins.createBuffer(4);
    let _ZOOM = 1;


    function cmd1(d: number) {
        let n = d % 256;
        pins.i2cWriteNumber(_I2CAddr, n, NumberFormat.UInt16BE);
    }

    function cmd2(d1: number, d2: number) {
        _buf3[0] = 0;
        _buf3[1] = d1;
        _buf3[2] = d2;
        pins.i2cWriteBuffer(_I2CAddr, _buf3);
    }

    function cmd3(d1: number, d2: number, d3: number) {
        _buf4[0] = 0;
        _buf4[1] = d1;
        _buf4[2] = d2;
        _buf4[3] = d3;
        pins.i2cWriteBuffer(_I2CAddr, _buf4);
    }

    function set_pos(col: number = 0, page: number = 0) {
        cmd1(0xb0 | page) // page number
        let c = col * (_ZOOM + 1)
        cmd1(0x00 | (c % 16)) // lower start column address
        cmd1(0x10 | (c >> 4)) // upper start column address    
    }

    // clear bit
    function clrbit(d: number, b: number): number {
        if (d & (1 << b))
            d -= (1 << b)
        return d
    }

    /**
     * 在 OLED 上显示一个像素
     * @param x is X alis, eg: 0
     * @param y is Y alis, eg: 0
     */
    //% blockId="OLED12864_I2C_PIXEL" block="显示像素 x %x|y %y"
    //% weight=70 blockGap=8
    //% parts=OLED12864_I2C trackArgs=0
    export function pixel(x: number, y: number) {
        let page = y >> 3
        let shift_page = y % 8
        let ind = x * (_ZOOM + 1) + page * 128 + 1
        let b = (color) ? (_screen[ind] | (1 << shift_page)) : clrbit(_screen[ind], shift_page)
        _screen[ind] = b
        set_pos(x, page)
        if (_ZOOM) {
            _screen[ind + 1] = b
            _buf3[0] = 0x40
            _buf3[1] = _buf3[2] = b
            pins.i2cWriteBuffer(_I2CAddr, _buf3)
        }
        else {
            _buf2[0] = 0x40
            _buf2[1] = b
            pins.i2cWriteBuffer(_I2CAddr, _buf2)
        }
    }

    /**
     * 显示一个字符串
     * @param x is X alis, eg: 0
     * @param y is Y alis, eg: 0
     * @param s is the text will be show, eg: 'Hello!'
     */
    //% blockId="OLED12864_I2C_SHOWSTRING" block="显示文字 x %x|y %y|文字 %s"
    //% weight=80 blockGap=8
    //% parts=OLED12864_I2C trackArgs=0
    export function showString(x: number, y: number, s: string) {
        let col = 0
        let p = 0
        let ind = 0
        for (let n = 0; n < s.length; n++) {
            p = font[s.charCodeAt(n)]
            for (let i = 0; i < 5; i++) {
                col = 0
                for (let j = 0; j < 5; j++) {
                    if (p & (1 << (5 * i + j)))
                        col |= (1 << (j + 1))
                }
                ind = (x + n) * 5 * (_ZOOM + 1) + y * 128 + i * (_ZOOM + 1) + 1
                if (color == 0)
                    col = 255 - col
                _screen[ind] = col
                if (_ZOOM)
                    _screen[ind + 1] = col
            }
        }
        set_pos(x * 5, y)
        let ind0 = x * 5 * (_ZOOM + 1) + y * 128
        let buf = _screen.slice(ind0, ind + 1)
        buf[0] = 0x40
        pins.i2cWriteBuffer(_I2CAddr, buf)
    }

    /**
     * 显示一个整数
     * @param x is X alis, eg: 0
     * @param y is Y alis, eg: 0
     * @param num is the number will be show, eg: 12
     */
    //% blockId="OLED12864_I2C_NUMBER" block="显示数字 x %x|y %y|数字 %num"
    //% weight=80 blockGap=8
    //% parts=OLED12864_I2C trackArgs=0
    export function showNumber(x: number, y: number, num: number) {
        showString(x, y, num.toString())
    }

    /**
     * 绘制一条水平线段
     * @param x is X alis, eg: 0
     * @param y is Y alis, eg: 0
     * @param len is the length of line, eg: 10
     */
    //% blockId="OLED12864_I2C_HLINE" block="绘制水平线段 x %x|y %y|长度 %len"
    //% weight=71 blockGap=8
    //% x.min=0 x.max=60
    //% y.min=0 y.max=30
    //% len.min=1 len.max=62
    //% parts=OLED12864_I2C trackArgs=0
    export function hline(x: number, y: number, len: number) {
        for (let i = x; i < (x + len); i++){
            pixel(i, y)
            basic.pause(1)
        }
    }

    /**
     * 绘制一条垂直线段
     * @param x is X alis, eg: 0
     * @param y is Y alis, eg: 0
     * @param len is the length of line, eg: 10
     */
    //% blockId="OLED12864_I2C_VLINE" block="绘制垂直线段 x %x|y %y|长度 %len"
    //% weight=72 blockGap=8
    //% x.min=0 x.max=60
    //% y.min=0 y.max=30
    //% len.min=1 len.max=30
    //% parts=OLED12864_I2C trackArgs=0
    export function vline(x: number, y: number, len: number) {
        for (let i = y; i < (y + len); i++){
            pixel(x, i)
            basic.pause(1)
        }
            

    }

    /**
     * 在指定位置绘制矩形
     * @param x1 is X alis, eg: 0
     * @param y1 is Y alis, eg: 0
     * @param x2 is X alis, eg: 60
     * @param y2 is Y alis, eg: 30
     */
    //% blockId="OLED12864_I2C_RECT" block="绘制矩形 x1 %x1|y1 %y1|x2 %x2|y2 %y2"
    //% weight=73 blockGap=8
    //% x1.min=0 x1.max=60
    //% y1.min=0 y1.max=30
    //% x2.min=0 x2.max=60
    //% y2.min=0 y2.max=30
    //% parts=OLED12864_I2C trackArgs=0
    export function rect(x1: number, y1: number, x2: number, y2: number) {
        if (x1 > x2){
            x1 = [x2, x2 = x1][0];
        }
            
        if (y1 > y2){
            y1 = [y2, y2 = y1][0];
        }
        hline(x1, y1, x2 - x1 + 1)
        vline(x2, y1, y2 - y1 + 1)
        hline(x1, y2, x2 - x1 + 1)
        vline(x1, y1, y2 - y1 + 1)
    }


    // /**
    //  * 重新绘制屏幕的显示内容
    //  */
    // //% blockId="OLED12864_I2C_DRAW" block="刷新显示"
    // //% weight=64 blockGap=8
    // //% parts=OLED12864_I2C trackArgs=0
    // export 
    function draw() {
        set_pos()
        pins.i2cWriteBuffer(_I2CAddr, _screen)
    }

    /**
     * 清除 OLED 模块的显示内容
     */
    //% blockId="OLED12864_I2C_CLEAR" block="清除显示内容"
    //% weight=63 blockGap=8
    //% parts=OLED12864_I2C trackArgs=0
    export function clears() {
        init()
    }


    function clear() {
        _screen.fill(0)
        _screen[0] = 0x40
        draw()
    }

    /**
     * 打开 OLED 模块的屏幕显示
     */
    //% blockId="OLED12864_I2C_ON" block="显示打开"
    //% weight=62 blockGap=8
    //% parts=OLED12864_I2C trackArgs=0
    export function on() {
        cmd1(0xAF)
    }

    /**
     * 关闭 OLED 模块的屏幕显示
     */
    //% blockId="OLED12864_I2C_OFF" block="显示关闭"
    //% weight=61 blockGap=8
    //% parts=OLED12864_I2C trackArgs=0
    export function off() {
        cmd1(0xAE)
    }


    /**
     * OLED 初始化
     */
    //% blockId="OLED12864_I2C_init" block="初始化 OLED"
    //% weight=100 blockGap=8
    //% parts=OLED12864_I2C trackArgs=0
    export function init() {
        cmd1(0xAE)       // SSD1306_DISPLAYOFF
        cmd1(0xA4)       // SSD1306_DISPLAYALLON_RESUME
        cmd2(0xD5, 0xF0) // SSD1306_SETDISPLAYCLOCKDIV
        cmd2(0xA8, 0x3F) // SSD1306_SETMULTIPLEX
        cmd2(0xD3, 0x00) // SSD1306_SETDISPLAYOFFSET
        cmd1(0 | 0x0)    // line #SSD1306_SETSTARTLINE
        cmd2(0x8D, 0x14) // SSD1306_CHARGEPUMP
        cmd2(0x20, 0x00) // SSD1306_MEMORYMODE
        cmd3(0x21, 0, 127) // SSD1306_COLUMNADDR
        cmd3(0x22, 0, 63)  // SSD1306_PAGEADDR
        cmd1(0xa0 | 0x1) // SSD1306_SEGREMAP
        cmd1(0xc8)       // SSD1306_COMSCANDEC
        cmd2(0xDA, 0x12) // SSD1306_SETCOMPINS
        cmd2(0x81, 0xCF) // SSD1306_SETCONTRAST
        cmd2(0xd9, 0xF1) // SSD1306_SETPRECHARGE
        cmd2(0xDB, 0x40) // SSD1306_SETVCOMDETECT
        cmd1(0xA6)       // SSD1306_NORMALDISPLAY
        cmd2(0xD6, 1)    // zoom on
        cmd1(0xAF)       // SSD1306_DISPLAYON
        clear()
        _ZOOM = 1
    }




    /*手势传感器 */

     /* Gesture parameters */
     let GESTURE_THRESHOLD_OUT = 30;
     let GESTURE_SENSITIVITY_1 = 33
     let GESTURE_SENSITIVITY_2 = 18
 
     /* Error code for returned values */
     //ERROR = 0xFF
 
     /* Acceptable parameters for setMode */
     let POWER = 0
     let PROXIMITY = 2
     let WAIT = 3
     let GESTURE = 6
     let ALL = 7
 
     /* LED Drive values */
     let LED_DRIVE_100MA = 0
 
     /* Gesture Gain (GGAIN) values */
     let GGAIN_4X = 2
 
     /* LED Boost values */
     let LED_BOOST_300 = 3
 
     /* Gesture wait time values */
     let GWTIME_2_8MS = 1
 
 
     /* Default values */
     let DEFAULT_GESTURE_PPULSE = 0x89    // 16us, 10 pulses
     let DEFAULT_GPENTH = 40      // Threshold for entering gesture mode
     let DEFAULT_GEXTH = 30      // Threshold for exiting gesture mode    
     let DEFAULT_GCONF1 = 0x40    // 4 gesture events for int., 1 for exit
     let DEFAULT_GGAIN = GGAIN_4X
     let DEFAULT_GLDRIVE = LED_DRIVE_100MA
     let DEFAULT_GWTIME = GWTIME_2_8MS
     let DEFAULT_GOFFSET = 0       // No offset scaling for gesture mode
     let DEFAULT_GPULSE = 0xC9    // 32us, 10 pulses
     let DEFAULT_GCONF3 = 0       // All photodiodes active during gesture
     let DEFAULT_GIEN = 0       // Disable gesture interrupts
 
     /* APDS-9960 I2C address:0x39 */
 
 
 
 
     /* Container for gesture data */
     export class gesture_data_type {
         u_data: Buffer;
         d_data: Buffer;
         l_data: Buffer;
         r_data: Buffer;
         index: number;
         total_gestures: number;
         in_threshold: number;
         out_threshold: number;
     }
 
     let gesture_data = new gesture_data_type;
 
     let data_buf: Buffer = pins.createBuffer(128);
 
     export class APDS9960 {
 
 
 
         gesture_ud_delta: number;
         gesture_lr_delta: number;
         gesture_ud_count: number;
         gesture_lr_count: number;
         gesture_near_count: number;
         gesture_far_count: number;
         gesture_state: number;
         gesture_motion: number;
 
         APDS9960ReadReg(addr: number): number {
             let buf: Buffer = pins.createBuffer(1);
             buf[0] = addr;
             pins.i2cWriteBuffer(0x39, buf, false);
             buf = pins.i2cReadBuffer(0x39, 1, false);
             return buf[0];
         }
 
         APDS9960WriteReg(addr: number, cmd: number) {
             let buf2: Buffer = pins.createBuffer(2);
 
             buf2[0] = addr;
             buf2[1] = cmd;
 
             pins.i2cWriteBuffer(0x39, buf2, false);
         }
 
 
         /**
          * @brief Reads a block (array) of bytes from the I2C device and register
          *
          * @param[in] reg the register to read from
          * @param[out] val pointer to the beginning of the data
          * @param[in] len number of bytes to read
          * @return Number of bytes read. -1 on read error.
          */
         APDS9960ReadRegBlock(addr: number, len: number): number {
             let i: number = 0;
             let y: number = 0;
 
             for (let j = 0; j < len; j = j + 4) {
 
                 data_buf[j] = this.readi2c(0xFc);
                 data_buf[j + 1] = this.readi2c(0xFd);
                 data_buf[j + 2] = this.readi2c(0xFe);
                 data_buf[j + 3] = this.readi2c(0xFf);
                 basic.pause(10);
 
             }
 
 
             return len;
         }
 
         getMode(): number {
             let enable_value: number;
 
             /* Read current ENABLE register */
             enable_value = this.APDS9960ReadReg(0x80);
             return enable_value;
         }
 
         setMode(mode: number, enable: number) {
             let reg_val: number;
             /* Read current ENABLE register */
             reg_val = this.getMode();
             /* Change bit(s) in ENABLE register */
             enable = enable & 0x01;
             if (mode >= 0 && mode <= 6) {
                 if (enable) {
                     reg_val |= (1 << mode);
                 } else {
                     //reg_val &= ~(1 << mode);
                     reg_val = 0x00;
                 }
             } else if (mode == ALL) {
                 if (enable) {
                     reg_val = 0x7F;
                 } else {
                     reg_val = 0x00;
                 }
             }
 
             /* Write value back to ENABLE register */
             this.APDS9960WriteReg(0x80, reg_val);
         }
 
         /**
          * @brief Sets the gain of the photodiode during gesture mode
          *
          * Value    Gain
          *   0       1x
          *   1       2x
          *   2       4x
          *   3       8x
          *
          * @param[in] gain the value for the photodiode gain
          * @return True if operation successful. False otherwise.
          */
         setGestureGain(gain: number) {
             let val: number;
 
             /* Read value from GCONF2 register */
             val = this.APDS9960ReadReg(0xA3);
 
             /* Set bits in register to given value */
             gain &= 0b00000011;
             gain = gain << 5;
             val &= 0b10011111;
             val |= gain;
 
             /* Write register value back into GCONF2 register */
             this.APDS9960WriteReg(0xA3, val);
         }
 
         /**
          * @brief Sets the LED drive current during gesture mode
          *
          * Value    LED Current
          *   0        100 mA
          *   1         50 mA
          *   2         25 mA
          *   3         12.5 mA
          *
          * @param[in] drive the value for the LED drive current
          * @return True if operation successful. False otherwise.
          */
         setGestureLEDDrive(drive: number) {
             let val2: number;
 
             /* Read value from GCONF2 register */
             val2 = this.APDS9960ReadReg(0xA3);
 
             /* Set bits in register to given value */
             drive &= 0b00000011;
             drive = drive << 3;
             val2 &= 0b11100111;
             val2 |= drive;
 
             /* Write register value back into GCONF2 register */
             this.APDS9960WriteReg(0xA3, val2);
         }
 
         /**
          * @brief Sets the LED current boost value
          *
          * Value  Boost Current
          *   0        100%
          *   1        150%
          *   2        200%
          *   3        300%
          *
          * @param[in] drive the value (0-3) for current boost (100-300%)
          * @return True if operation successful. False otherwise.
          */
         setLEDBoost(boost: number) {
             let val3: number;
 
             /* Read value from CONFIG2 register */
             val3 = this.APDS9960ReadReg(0x90);
 
             /* Set bits in register to given value */
             boost &= 0b00000011;
             boost = boost << 4;
             val3 &= 0b11001111;
             val3 |= boost;
 
             /* Write register value back into CONFIG2 register */
             this.APDS9960WriteReg(0x90, val3);
         }
 
         /**
          * @brief Sets the time in low power mode between gesture detections
          *
          * Value    Wait time
          *   0          0 ms
          *   1          2.8 ms
          *   2          5.6 ms
          *   3          8.4 ms
          *   4         14.0 ms
          *   5         22.4 ms
          *   6         30.8 ms
          *   7         39.2 ms
          *
          * @param[in] the value for the wait time
          * @return True if operation successful. False otherwise.
          */
         setGestureWaitTime(time: number) {
             let val4: number;
 
             /* Read value from GCONF2 register */
             val4 = this.APDS9960ReadReg(0xA3);
 
             /* Set bits in register to given value */
             time &= 0b00000111;
             val4 &= 0b11111000;
             val4 |= time;
 
             /* Write register value back into GCONF2 register */
             this.APDS9960WriteReg(0xA3, val4);
         }
 
         /**
          * @brief Turns gesture-related interrupts on or off
          *
          * @param[in] enable 1 to enable interrupts, 0 to turn them off
          * @return True if operation successful. False otherwise.
          */
         setGestureIntEnable(enable: number) {
             let val5: number;
 
             /* Read value from GCONF4 register */
             val5 = this.APDS9960ReadReg(0xAB);
 
             /* Set bits in register to given value */
             enable &= 0b00000001;
             enable = enable << 1;
             val5 &= 0b11111101;
             val5 |= enable;
 
             /* Write register value back into GCONF4 register */
             this.APDS9960WriteReg(0xAB, val5);
         }
 
         /**
          * @brief Resets all the parameters in the gesture data member
          */
         resetGestureParameters() {
 
             gesture_data.index = 0;
             gesture_data.total_gestures = 0;
 
             this.gesture_ud_delta = 0;
             this.gesture_lr_delta = 0;
 
             this.gesture_ud_count = 0;
             this.gesture_lr_count = 0;
 
             this.gesture_near_count = 0;
             this.gesture_far_count = 0;
 
             this.gesture_state = 0;
             this.gesture_motion = DIR.DIR_NONE;
 
         }
 
         /**
          * @brief Tells the state machine to either enter or exit gesture state machine
          *
          * @param[in] mode 1 to enter gesture state machine, 0 to exit.
          * @return True if operation successful. False otherwise.
          */
         setGestureMode(mode: number) {
             let val6: number;
 
             /* Read value from GCONF4 register */
             val6 = this.APDS9960ReadReg(0xAB);
 
             /* Set bits in register to given value */
             mode &= 0b00000001;
             val6 &= 0b11111110;
             val6 |= mode;
 
             /* Write register value back into GCONF4 register */
             this.APDS9960WriteReg(0xAB, val6);
         }
 
         /**
          * Turn the APDS-9960 on
          *
          * @return True if operation successful. False otherwise.
          */
         enablePower() {
             this.setMode(POWER, 1);
         }
 
         /**
          * @brief Starts the gesture recognition engine on the APDS-9960
          *
          * @param[in] interrupts true to enable hardware external interrupt on gesture
          * @return True if engine enabled correctly. False on error.
          */
         enableGestureSensor(interrupts: boolean) {
 
             /* Enable gesture mode
             Set ENABLE to 0 (power off)
             Set WTIME to 0xFF
             Set AUX to LED_BOOST_300
             Enable PON, WEN, PEN, GEN in ENABLE 
             */
             this.resetGestureParameters();
             this.APDS9960WriteReg(0x83, 0xFF);
             this.APDS9960WriteReg(0x8E, DEFAULT_GESTURE_PPULSE);
             this.setLEDBoost(LED_BOOST_300);
             if (interrupts) {
                 this.setGestureIntEnable(1);
             } else {
                 this.setGestureIntEnable(0);
             }
             this.setGestureMode(1);
             this.enablePower();
             this.setMode(WAIT, 1)
             this.setMode(PROXIMITY, 1);
             this.setMode(GESTURE, 1);
         }
 
         pads9960_init() {
 
             let aa = this.APDS9960ReadReg(0X92);
             if (aa == 0xAB) {
                 this.APDS9960WriteReg(0xA0, DEFAULT_GPENTH);//0x28
                 this.APDS9960WriteReg(0xA1, DEFAULT_GEXTH);//0x1e
                 this.APDS9960WriteReg(0xA2, DEFAULT_GCONF1);//0x40
                 this.setGestureGain(DEFAULT_GGAIN);//0x41
                 this.setGestureLEDDrive(DEFAULT_GLDRIVE);
                 this.setGestureWaitTime(DEFAULT_GWTIME);
                 this.APDS9960WriteReg(0xA4, DEFAULT_GOFFSET);
                 this.APDS9960WriteReg(0xA5, DEFAULT_GOFFSET);
                 this.APDS9960WriteReg(0xA7, DEFAULT_GOFFSET);
                 this.APDS9960WriteReg(0xA9, DEFAULT_GOFFSET);
                 this.APDS9960WriteReg(0xA6, DEFAULT_GPULSE);//0xc9
                 this.APDS9960WriteReg(0xAA, DEFAULT_GCONF3);//00
                 this.setGestureIntEnable(DEFAULT_GIEN);
             }
 
 
         }
 
         /**
          * @brief Determines if there is a gesture available for reading
          *
          * @return True if gesture available. False otherwise.
          */
         isGestureAvailable(): boolean {
             let val8: number;
 
             /* Read value from GSTATUS register */
             val8 = this.APDS9960ReadReg(0xAF);
             /* Shift and mask out GVALID bit */
             val8 &= 0b00000001;
 
             /* Return true/false based on GVALID bit */
             if (val8 == 1) {
                 return true;
             } else {
                 return false;
             }
         }
 
         /**
          * @brief Processes the raw gesture data to determine swipe direction
          *
          * @return True if near or far state seen. False otherwise.
          */
         processGestureData(): boolean {
             let u_first: number = 0;
             let d_first: number = 0;
             let l_first: number = 0;
             let r_first: number = 0;
             let u_last: number = 0;
             let d_last: number = 0;
             let l_last: number = 0;
             let r_last: number = 0;
             let ud_ratio_first: number;
             let lr_ratio_first: number;
             let ud_ratio_last: number;
             let lr_ratio_last: number;
             let ud_delta: number;
             let lr_delta: number;
             let k: number;
 
             /* If we have less than 4 total gestures, that's not enough */
             if (gesture_data.total_gestures <= 4) {
                 return false;
             }
 
             /* Check to make sure our data isn't out of bounds */
             if ((gesture_data.total_gestures <= 32) && (gesture_data.total_gestures > 0)) {
 
                 /* Find the first value in U/D/L/R above the threshold */
                 for (k = 0; k < gesture_data.total_gestures; k++) {
                     if ((gesture_data.u_data[k] > GESTURE_THRESHOLD_OUT) &&
                         (gesture_data.d_data[k] > GESTURE_THRESHOLD_OUT) &&
                         (gesture_data.l_data[k] > GESTURE_THRESHOLD_OUT) &&
                         (gesture_data.r_data[k] > GESTURE_THRESHOLD_OUT)) {
 
                         u_first = gesture_data.u_data[k];
                         d_first = gesture_data.d_data[k];
                         l_first = gesture_data.l_data[k];
                         r_first = gesture_data.r_data[k];
                         break;
                     }
                 }
 
                 /* If one of the _first values is 0, then there is no good data */
                 if ((u_first == 0) || (d_first == 0) || (l_first == 0) || (r_first == 0)) {
 
                     return false;
                 }
                 /* Find the last value in U/D/L/R above the threshold */
                 for (k = gesture_data.total_gestures - 1; k >= 0; k--) {
 
 
                     if ((gesture_data.u_data[k] > GESTURE_THRESHOLD_OUT) &&
                         (gesture_data.d_data[k] > GESTURE_THRESHOLD_OUT) &&
                         (gesture_data.l_data[k] > GESTURE_THRESHOLD_OUT) &&
                         (gesture_data.r_data[k] > GESTURE_THRESHOLD_OUT)) {
 
                         u_last = gesture_data.u_data[k];
                         d_last = gesture_data.d_data[k];
                         l_last = gesture_data.l_data[k];
                         r_last = gesture_data.r_data[k];
                         break;
                     }
                 }
             }
 
             /* Calculate the first vs. last ratio of up/down and left/right */
             ud_ratio_first = ((u_first - d_first) * 100) / (u_first + d_first);
             lr_ratio_first = ((l_first - r_first) * 100) / (l_first + r_first);
             ud_ratio_last = ((u_last - d_last) * 100) / (u_last + d_last);
             lr_ratio_last = ((l_last - r_last) * 100) / (l_last + r_last);
             if (ud_ratio_first == 0 && lr_ratio_first == 0 && ud_ratio_last == 0 && lr_ratio_last == 0) {
 
                 this.pads9960_init();
                 this.enableGestureSensor(false);
             }
 
 
             /* Determine the difference between the first and last ratios */
             ud_delta = ud_ratio_last - ud_ratio_first;
             lr_delta = lr_ratio_last - lr_ratio_first;
 
 
             /* Accumulate the UD and LR delta values */
             this.gesture_ud_delta += ud_delta;
             this.gesture_lr_delta += lr_delta;
 
             /* Determine U/D gesture */
             if (this.gesture_ud_delta >= GESTURE_SENSITIVITY_1) {
                 this.gesture_ud_count = 1;
             } else if (this.gesture_ud_delta <= -GESTURE_SENSITIVITY_1) {
                 this.gesture_ud_count = -1;
             } else {
                 this.gesture_ud_count = 0;
             }
 
             /* Determine L/R gesture */
             if (this.gesture_lr_delta >= GESTURE_SENSITIVITY_1) {
                 this.gesture_lr_count = 1;
             } else if (this.gesture_lr_delta <= -GESTURE_SENSITIVITY_1) {
                 this.gesture_lr_count = -1;
             } else {
                 this.gesture_lr_count = 0;
             }
 
             /* Determine Near/Far gesture */
             if ((this.gesture_ud_count == 0) && (this.gesture_lr_count == 0)) {
                 if ((Math.abs(ud_delta) < GESTURE_SENSITIVITY_2) && (Math.abs(lr_delta) < GESTURE_SENSITIVITY_2)) {
 
                     if ((ud_delta == 0) && (lr_delta == 0)) {
                         this.gesture_near_count++;
                     } else if ((ud_delta != 0) || (lr_delta != 0)) {
                         this.gesture_far_count++;
                     }
 
                     if ((this.gesture_near_count >= 10) && (this.gesture_far_count >= 2)) {
                         if ((ud_delta == 0) && (lr_delta == 0)) {
                             this.gesture_state = STATE.NEAR_STATE;
                         } else if ((ud_delta != 0) && (lr_delta != 0)) {
                             this.gesture_state = STATE.FAR_STATE;
                         }
                         return true;
                     }
                 }
             } else {
                 if ((Math.abs(ud_delta) < GESTURE_SENSITIVITY_2) && (Math.abs(lr_delta) < GESTURE_SENSITIVITY_2)) {
 
                     if ((ud_delta == 0) && (lr_delta == 0)) {
                         this.gesture_near_count++;
                     }
 
                     if (this.gesture_near_count >= 10) {
                         this.gesture_ud_count = 0;
                         this.gesture_lr_count = 0;
                         this.gesture_ud_delta = 0;
                         this.gesture_lr_delta = 0;
                     }
                 }
             }
 
 
 
             return true;
         }
 
         /**
          * @brief Determines swipe direction or near/far state
          *
          * @return True if near/far event. False otherwise.
          */
         decodeGesture(): boolean {
 
 
             //("gesture_state"+gesture_state);
             // serial.writeLine("gesture_ud_count: "+gesture_ud_count+" ; "+"gesture_lr_count: "+gesture_lr_count);
             /* Return if near or far event is detected */
             if (this.gesture_state == STATE.NEAR_STATE) {
                 this.gesture_motion = DIR.DIR_NEAR;
                 return true;
             } else if (this.gesture_state == STATE.FAR_STATE) {
                 this.gesture_motion = DIR.DIR_FAR;
                 return true;
             }
 
             /* Determine swipe direction */
             if ((this.gesture_ud_count == -1) && (this.gesture_lr_count == 0)) {
                 this.gesture_motion = DIR.DIR_UP;
             } else if ((this.gesture_ud_count == 1) && (this.gesture_lr_count == 0)) {
                 this.gesture_motion = DIR.DIR_DOWN;
             } else if ((this.gesture_ud_count == 0) && (this.gesture_lr_count == 1)) {
                 this.gesture_motion = DIR.DIR_RIGHT;
             } else if ((this.gesture_ud_count == 0) && (this.gesture_lr_count == -1)) {
                 this.gesture_motion = DIR.DIR_LEFT;
             } else if ((this.gesture_ud_count == -1) && (this.gesture_lr_count == 1)) {
                 if (Math.abs(this.gesture_ud_delta) > Math.abs(this.gesture_lr_delta)) {
                     this.gesture_motion = DIR.DIR_UP;
                 } else {
                     this.gesture_motion = DIR.DIR_RIGHT;
                 }
             } else if ((this.gesture_ud_count == 1) && (this.gesture_lr_count == -1)) {
                 if (Math.abs(this.gesture_ud_delta) > Math.abs(this.gesture_lr_delta)) {
                     this.gesture_motion = DIR.DIR_DOWN;
                 } else {
                     this.gesture_motion = DIR.DIR_LEFT;
                 }
             } else if ((this.gesture_ud_count == -1) && (this.gesture_lr_count == -1)) {
                 if (Math.abs(this.gesture_ud_delta) > Math.abs(this.gesture_lr_delta)) {
                     this.gesture_motion = DIR.DIR_UP;
                 } else {
                     this.gesture_motion = DIR.DIR_LEFT;
                 }
             } else if ((this.gesture_ud_count == 1) && (this.gesture_lr_count == 1)) {
                 if (Math.abs(this.gesture_ud_delta) > Math.abs(this.gesture_lr_delta)) {
                     this.gesture_motion = DIR.DIR_DOWN;
                 } else {
                     this.gesture_motion = DIR.DIR_RIGHT;
                 }
             } else {
                 return false;
             }
 
             return true;
         }
         /**
          * @brief Processes a gesture event and returns best guessed gesture
          *
          * @return Number corresponding to gesture. -1 on error.
          */
         readGesture(): number {
             let fifo_level: number = 0;
             let bytes_read: number = 0;
             let fifo_data: number[] = [];
             let gstatus: number;
             let motion: number;
             let l: number;
             //resetGestureParameters();
             gesture_data.d_data = pins.createBuffer(32);
             gesture_data.u_data = pins.createBuffer(32);
             gesture_data.l_data = pins.createBuffer(32);
             gesture_data.r_data = pins.createBuffer(32);
             //("read sensor start");
             /* Make sure that power and gesture is on and data is valid */
             if (!this.isGestureAvailable() || !(this.getMode() & 0b01000001)) {
                 return DIR.DIR_NONE;
             }
 
             /* Keep looping as long as gesture data is valid */
             while (1) {
                 basic.pause(30);
                 /* Get the contents of the STATUS register. Is data still valid? */
                 gstatus = this.APDS9960ReadReg(0xAF);
                 /* If we have valid data, read in FIFO */
                 if ((gstatus & 0b00000001) == 0b00000001) {
                     /* Read the current FIFO level */
                     fifo_level = this.APDS9960ReadReg(0xAE);
 
                     /* If there's stuff in the FIFO, read it into our data block */
                     if (fifo_level > 0) {
                         bytes_read = this.APDS9960ReadRegBlock(0xFC,
                             (fifo_level * 4));
 
                         for (let m = 0; m < bytes_read; m++) {
 
                             fifo_data[m] = data_buf[m];
                         }
 
                         if (bytes_read >= 4) {
                             for (let ii = 0; ii < bytes_read; ii = ii + 4) {
                                 gesture_data.u_data[gesture_data.index] = fifo_data[ii + 0];
                                 gesture_data.d_data[gesture_data.index] = fifo_data[ii + 1];
                                 gesture_data.l_data[gesture_data.index] = fifo_data[ii + 2];
                                 gesture_data.r_data[gesture_data.index] = fifo_data[ii + 3];
                                 gesture_data.index++;
                                 gesture_data.total_gestures++;
                             }
 
                             /* Filter and process gesture data. Decode near/far state */
                             if (this.processGestureData()) {
                                 if (this.decodeGesture()) {
                                     motion = this.gesture_motion;
                                     this.resetGestureParameters();
                                     return motion;
                                 }
                             }
                             /* Reset data */
                             gesture_data.index = 0;
                             gesture_data.total_gestures = 0;
                         }
 
                     }
 
                 }
                 else {
                     /* Determine best guessed gesture and clean up */
                     basic.pause(30);
                     this.decodeGesture();
                     motion = this.gesture_motion;
 
 
                     this.resetGestureParameters();
                     return motion;
                 }
 
             }
 
             motion = this.gesture_motion;
             return motion;
         }
 
         read(): number {
             let result = GESTURE_TYPE.None;
             switch (this.readGesture()) {
                 case DIR.DIR_UP:
                     result = GESTURE_TYPE.Up;
                     break;
                 case DIR.DIR_DOWN:
                     result = GESTURE_TYPE.Down;
                     break;
                 case DIR.DIR_LEFT:
                     result = GESTURE_TYPE.Left;
                     break;
                 case DIR.DIR_RIGHT:
                     result = GESTURE_TYPE.Right;
                     break;
                 case DIR.DIR_NEAR:
                     result = GESTURE_TYPE.Forward;
                     break;
                 case DIR.DIR_FAR:
                     result = GESTURE_TYPE.Backward;
                     break;
                 default:
 
             }
             return result;
         }
 
 
         readi2c(addr: number): number {
             return this.APDS9960ReadReg(addr);
         }
 
 
     }//end class APDS9960
 
 
 
 
     /**
      * 使用手势传感器前，先进行初始化。
      */
     //% weight=200 blockGap=8
     //% blockId="gesture_init" block="Initialize the gesture sensor " group="apds手势传感器"
     //% subcategory="智能模块"
     export function init() {
         let apds9960 = new APDS9960();
         apds9960.pads9960_init();
         apds9960.enableGestureSensor(false);
         basic.pause(100);
 
         //initiate gesture monitoring
         control.inBackground(() => {
             let prevGst = GESTURE_TYPE.None;
             while (true) {
                 let gst = apds9960.read();
                 // basic.showNumber(gst);
                 if (gst != prevGst) {
                     prevGst = gst;
                     control.raiseEvent(3100, gst, EventCreationMode.CreateAndFire);
 
                 }
                 basic.pause(50);
             }
 
         })
         // return apds9960;
     }
 
 
     /**
      * 手势传感器检测挥手动作：无、上、下、左、右、前进、后退。
      * @param gesture type of gesture to detect
      * @param handler code to run
      */
     //% weight=200 blockGap=8
     //% blockId="gesture_listener_block" block="Detect gestures|%gesture" group="apds手势传感器"
     //% subcategory="智能模块"
     export function onGesture(gesture: GESTURE_TYPE, handler: () => void) {
         control.onEvent(3100, gesture, handler);
     }

     
}