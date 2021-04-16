/**
* makecode I2C OLED 128x64 扩展.
* From microbit/micropython Chinese community.
* http://www.micropython.org.cn
*/

//% weight=20 color=#0855AA icon="O" block="OLED12864_I2C"
namespace OLED12864_I2C {


    let res = 10;
    let OLED_CMD = 0;
    let OLED_DATA = 1;
    let OLED_GRAM: any[][];
    let a: number;
    let b: number;


    function OLED_ColorTurn(i: number) {
        if (!i) {
            OLED_WR_Byte(0xA6, OLED_CMD, a, b)
        }//正常显示
        else {
            OLED_WR_Byte(0xA7, OLED_CMD, a, b)
        };//反色显示
    }

    function OLED_DisplayTurn(i: number) {
        if (i == 0) {
            OLED_WR_Byte(0xC8, OLED_CMD, a, b);//正常显示
            OLED_WR_Byte(0xA1, OLED_CMD, a, b);
        }
        else {
            OLED_WR_Byte(0xC0, OLED_CMD, a, b);//反转显示
            OLED_WR_Byte(0xA0, OLED_CMD, a, b);
        }
    }


    //初始化
    function OLED_WR_Byte(dat: number, mode: number, scl: number, sda: number) {
        I2C_Start(scl, sda);
        Send_Byte(0x78, scl, sda);
        I2C_WaitAck(scl);
        if (mode) { Send_Byte(0x40, scl, sda); }
        else { Send_Byte(0x00, scl, sda); }
        I2C_WaitAck(scl);
        Send_Byte(dat, scl, sda);
        I2C_WaitAck(scl);
        I2C_Stop(scl, sda);
    }

    //起始信号
    function I2C_Start(scl: number, sda: number) {
        pins.digitalWritePin(sda, 1)
        pins.digitalWritePin(scl, 1)
        pins.digitalWritePin(sda, 0)
        pins.digitalWritePin(scl, 0)
    }

    //写入一个字符
    function Send_Byte(dat: number, scl: number, sda: number) {
        let i;
        for (i = 0; i < 8; i++) {
            pins.digitalWritePin(scl, 0)//将时钟信号设置为低电平
            if (dat & 0x80)//将dat的8位从最高位依次写入
            {
                pins.digitalWritePin(sda, 1);
            }
            else {
                pins.digitalWritePin(sda, 0);
            }
            pins.digitalWritePin(scl, 1);//将时钟信号设置为高电平
            pins.digitalWritePin(scl, 0);//将时钟信号设置为低电平
            dat <<= 1;
        }
    }

    //等待信号响应
    function I2C_WaitAck(scl: number) //测数据信号的电平
    {
        pins.digitalWritePin(scl, 1);
        pins.digitalWritePin(scl, 0);
    }

    //结束信号
    function I2C_Stop(scl: number, sda: number) {
        pins.digitalWritePin(scl, 1);
        pins.digitalWritePin(sda, 0);
        pins.digitalWritePin(sda, 1)// OLED_SDIN_Set();
    }




    //清屏函数
    function OLED_Clear() {
        let i, n;
        for (i = 0; i < 8; i++) {
            for (n = 0; n < 128; n++) {
                OLED_GRAM[n][i] = 0;//清除所有数据
            }
        }
        OLED_Refresh(a, b);//更新显示
    }

    //更新显存到OLED 
    function OLED_Refresh(scl: number, sda: number) {
        let i, n;
        for (i = 0; i < 8; i++) {
            OLED_WR_Byte(0xb0 + i, OLED_CMD, scl, sda); //设置行起始地址
            OLED_WR_Byte(0x00, OLED_CMD, scl, sda);   //设置低列起始地址
            OLED_WR_Byte(0x10, OLED_CMD, scl, sda);   //设置高列起始地址
            for (n = 0; n < 128; n++)
                OLED_WR_Byte(OLED_GRAM[n][i], OLED_DATA, scl, sda);
        }
    }


    /**
     * 
     * 下载内容
     */
 
    // function cmd2(d1: number, d2: number) {
    //     _buf3[0] = 0;
    //     _buf3[1] = d1;
    //     _buf3[2] = d2;
    //     pins.i2cWriteBuffer(_I2CAddr, _buf3);
    // }

    // function cmd3(d1: number, d2: number, d3: number) {
    //     _buf4[0] = 0;
    //     _buf4[1] = d1;
    //     _buf4[2] = d2;
    //     _buf4[3] = d3;
    //     pins.i2cWriteBuffer(_I2CAddr, _buf4);
    // }

   

    // // clear bit
    // function clrbit(d: number, b: number): number {
    //     if (d & (1 << b))
    //         d -= (1 << b)
    //     return d
    // }

    /**
     * 在 OLED 上显示一个像素
     * @param x is X alis, eg: 0
     * @param y is Y alis, eg: 0
     */
    //% blockId="OLED12864_I2C_PIXEL" block="显示字符 x %x|y %y|字符内容 %chr|字体大小 %size1"
    //% weight=70 blockGap=8
    //% parts=OLED12864_I2C trackArgs=0   shim=OLED_display::OLED_ShowChar
    export function OLED_ShowChars(x: number, y: number, chr: string, size1: number) {
        return;
    }





    // pixel(x: number, y: number, color: number = 1) {
    //     let page = y >> 3
    //     let shift_page = y % 8
    //     let ind = x * (_ZOOM + 1) + page * 128 + 1
    //     let b = (color) ? (_screen[ind] | (1 << shift_page)) : clrbit(_screen[ind], shift_page)
    //     _screen[ind] = b
    //     set_pos(x, page)
    //     if (_ZOOM) {
    //         _screen[ind + 1] = b
    //         _buf3[0] = 0x40
    //         _buf3[1] = _buf3[2] = b
    //         pins.i2cWriteBuffer(_I2CAddr, _buf3)
    //     }
    //     else {
    //         _buf2[0] = 0x40
    //         _buf2[1] = b
    //         pins.i2cWriteBuffer(_I2CAddr, _buf2)
    //     }
    // }

    /**
     * 显示一个字符串
     * @param x is X alis, eg: 0
     * @param y is Y alis, eg: 0
     * @param s is the text will be show, eg: 'Hello!'
     * @param color is string color, eg: 1
     */
    //% blockId="OLED12864_I2C_SHOWSTRING" block="显示文字 x %x|y %y|文字 %s|颜色 %color"
    //% weight=80 blockGap=8
    //% parts=OLED12864_I2C trackArgs=0
    export function showString(x: number, y: number, s: string, color: number = 1) {
        return;
    }

    /**
     * 显示一个整数
     * @param x is X alis, eg: 0
     * @param y is Y alis, eg: 0
     * @param num is the number will be show, eg: 12
     * @param color is number color, eg: 1
     */
    //% blockId="OLED12864_I2C_NUMBER" block="显示数字 x %x|y %y|数字 %num|颜色 %color"
    //% weight=80 blockGap=8
    //% parts=OLED12864_I2C trackArgs=0
    export function showNumber(x: number, y: number, num: number, color: number = 1) {
        return;
    }

    /**
     * 绘制一条水平线段
     * @param x is X alis, eg: 0
     * @param y is Y alis, eg: 0
     * @param len is the length of line, eg: 10
     * @param color is line color, eg: 1
     */
    //% blockId="OLED12864_I2C_HLINE" block="绘制水平线段 x %x|y %y|长度 %len|颜色 %color"
    //% weight=71 blockGap=8
    //% parts=OLED12864_I2C trackArgs=0
    export function hline(x: number, y: number, len: number, color: number = 1) {
        return;
    }

    /**
     * 绘制一条垂直线段
     * @param x is X alis, eg: 0
     * @param y is Y alis, eg: 0
     * @param len is the length of line, eg: 10
     * @param color is line color, eg: 1
     */
    //% blockId="OLED12864_I2C_VLINE" block="绘制垂直线段 x %x|y %y|长度 %len|颜色 %color"
    //% weight=72 blockGap=8
    //% parts=OLED12864_I2C trackArgs=0
    export function vline(x: number, y: number, len: number, color: number = 1) {
       return
    }

    /**
     * 在指定位置绘制矩形
     * @param x1 is X alis, eg: 0
     * @param y1 is Y alis, eg: 0
     * @param x2 is X alis, eg: 60
     * @param y2 is Y alis, eg: 30
     * @param color is line color, eg: 1
     */
    //% blockId="OLED12864_I2C_RECT" block="绘制矩形 x1 %x1|y1 %y1|x2 %x2|y2 %y2|颜色 %color"
    //% weight=73 blockGap=8
    //% parts=OLED12864_I2C trackArgs=0
    export function rect(x1: number, y1: number, x2: number, y2: number, color: number = 1) {
        return;
    }

    /**
     * 重新绘制屏幕的显示内容xxxxxx
     */
    //% blockId="OLED12864_I2C_DRAW" block="OLED实时刷新"
    //% weight=64 blockGap=8
    //% parts=OLED12864_I2C trackArgs=0
    export function draw() {
        OLED_Refresh(a, b)
    }

    /**
     * 清除 OLED 模块的显示内容
     */
    //% blockId="OLED12864_I2C_CLEAR" block="OLED清屏"
    //% weight=63 blockGap=8
    //% parts=OLED12864_I2C trackArgs=0
    export function clear() {
        OLED_Clear()
    }


    /**
     * OLED 初始化
     * @param addr 是 i2c 地址, eg: 60
     */
    //% blockId="OLED12864_I2C_init" block="初始化 OLED,设置引脚SCL %scls SDA %sdas"
    //% weight=100 blockGap=8
    //% parts=OLED12864_I2C trackArgs=0
    export function init(scls: DigitalPin, sdas: DigitalPin) {
        // pinMode(scls, OUTPUT);//设置数字8
        // pinMode(sdas, OUTPUT);//设置数字9
        // pinMode(res, OUTPUT);//设置数字10
        a = scls;
        b = sdas;
        pins.digitalWritePin(res, 1);
        basic.pause(100);
        pins.digitalWritePin(res, 0);
        basic.pause(200);
        pins.digitalWritePin(res, 1);


        OLED_WR_Byte(0xAE, OLED_CMD, scls, sdas);//--turn off oled panel 19 关闭面板
        OLED_WR_Byte(0x00, OLED_CMD, scls, sdas);//---set low column address设置低列地址
        OLED_WR_Byte(0x10, OLED_CMD, scls, sdas);//---set high column address设置高列地址
        OLED_WR_Byte(0x40, OLED_CMD, scls, sdas);//--set start line address  Set Mapping RAM Display Start Line (0x00~0x3F)设置起始行地址设置映射RAM显示起始行
        OLED_WR_Byte(0x81, OLED_CMD, scls, sdas);//--set contrast control register设置对比度控制寄存器
        OLED_WR_Byte(0xCF, OLED_CMD, scls, sdas);// Set SEG Output Current Brightness设置SEG输出电流亮度
        OLED_WR_Byte(0xA1, OLED_CMD, scls, sdas);//--Set SEG/Column Mapping 设置SEG /列映射    0xa0左右反置 0xa1正常
        OLED_WR_Byte(0xC8, OLED_CMD, scls, sdas);//Set COM/Row Scan Direction 设置COM /行扫描方向  0xc0上下反置 0xc8正常
        OLED_WR_Byte(0xA6, OLED_CMD, scls, sdas);//--set normal display   设置正常显示
        OLED_WR_Byte(0xA8, OLED_CMD, scls, sdas);//--set multiplex ratio(1 to 64)  设置多路复用率（1到64）
        OLED_WR_Byte(0x3f, OLED_CMD, scls, sdas);//--1/64 duty
        OLED_WR_Byte(0xD3, OLED_CMD, scls, sdas);//-set display offset Shift Mapping RAM Counter (0x00~0x3F) 设置显示偏移移位映射RAM计数器
        OLED_WR_Byte(0x00, OLED_CMD, scls, sdas);//-not offset  不抵消
        OLED_WR_Byte(0xd5, OLED_CMD, scls, sdas);//--set display clock divide ratio/oscillator frequency   设置显示时钟分频比/振荡器频率
        OLED_WR_Byte(0x80, OLED_CMD, scls, sdas);//--set divide ratio, Set Clock as 100 Frames/Sec  设置分频比，将时钟设置为100帧/秒
        OLED_WR_Byte(0xD9, OLED_CMD, scls, sdas);//--set pre-charge period  设定预充电时间
        OLED_WR_Byte(0xF1, OLED_CMD, scls, sdas);//Set Pre-Charge as 15 Clocks & Discharge as 1 Clock   将预充电设置为15个时钟并将放电设置为1个时钟
        OLED_WR_Byte(0xDA, OLED_CMD, scls, sdas);//--set com pins hardware configuration   设置com引脚的硬件配置
        OLED_WR_Byte(0x12, OLED_CMD, scls, sdas);
        OLED_WR_Byte(0xDB, OLED_CMD, scls, sdas);//--set vcomh  设置vcomh
        OLED_WR_Byte(0x40, OLED_CMD, scls, sdas);//Set VCOM Deselect Level   设置VCOM取消选择级别
        OLED_WR_Byte(0x20, OLED_CMD, scls, sdas);//-Set Page Addressing Mode (0x00/0x01/0x02)  设置页面寻址模式
        OLED_WR_Byte(0x02, OLED_CMD, scls, sdas);//
        OLED_WR_Byte(0x8D, OLED_CMD, scls, sdas);//--set Charge Pump enable/disable   设置电荷泵启用/禁用
        OLED_WR_Byte(0x14, OLED_CMD, scls, sdas);//--set(0x10) disable   设置（0x10）禁用
        OLED_WR_Byte(0xA4, OLED_CMD, scls, sdas);// Disable Entire Display On (0xa4/0xa5)   禁用整个显示
        OLED_WR_Byte(0xA6, OLED_CMD, scls, sdas);// Disable Inverse Display On (0xa6/a7)    禁用反向显示
        OLED_WR_Byte(0xAF, OLED_CMD, scls, sdas);
        OLED_Clear();
        OLED_ColorTurn(0);
        OLED_DisplayTurn(0);
    }
}