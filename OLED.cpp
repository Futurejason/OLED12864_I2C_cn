#include "font.h"



//% weight=20 color=#0855AA icon="O" 
//% block="OLED_display"
namespace OLED_display{

  //画点
  //x:0~127
  //y:0~63
  void OLED_DrawPoint(uint8_t x, uint8_t y)
  {
    uint8_t i, m, n;
    i = y / 8;
    m = y % 8;
    n = 1 << m;
    OLED_GRAM[x][i] |= n;
  }

  //清除一个点
  //x:0~127
  //y:0~63
  void OLED_ClearPoint(uint8_t x, uint8_t y)
  {
    uint8_t i, m, n;
    i = y / 8;
    m = y % 8;
    n = 1 << m;
    OLED_GRAM[x][i] = ~OLED_GRAM[x][i];
    OLED_GRAM[x][i] |= n;
    OLED_GRAM[x][i] = ~OLED_GRAM[x][i];
  }

  //画线
  //x:0~128
  //y:0~64
  void OLED_DrawLine(uint8_t x1, uint8_t y1, uint8_t x2, uint8_t y2)
  {
    uint8_t i, k, k1, k2, y0;
    if (x1 == x2) //画竖线
    {
      for (i = 0; i < (y2 - y1); i++)
      {
        OLED_DrawPoint(x1, y1 + i);
      }
    }
    else if (y1 == y2) //画横线
    {
      for (i = 0; i < (x2 - x1); i++)
      {
        OLED_DrawPoint(x1 + i, y1);
      }
    }
    else //画斜线
    {
      k1 = y2 - y1;
      k2 = x2 - x1;
      k = k1 * 10 / k2;
      for (i = 0; i < (x2 - x1); i++)
      {
        OLED_DrawPoint(x1 + i, y1 + i * k / 10);
      }
    }
  }
  //x,y:圆心坐标
  //r:圆的半径
  void OLED_DrawCircle(uint8_t x, uint8_t y, uint8_t r)
  {
    int a, b, num;
    a = 0;
    b = r;
    while (2 * b * b >= r * r)
    {
      OLED_DrawPoint(x + a, y - b);
      OLED_DrawPoint(x - a, y - b);
      OLED_DrawPoint(x - a, y + b);
      OLED_DrawPoint(x + a, y + b);

      OLED_DrawPoint(x + b, y + a);
      OLED_DrawPoint(x + b, y - a);
      OLED_DrawPoint(x - b, y - a);
      OLED_DrawPoint(x - b, y + a);

      a++;
      num = (a * a + b * b) - r * r; //计算画的点离圆心的距离
      if (num > 0)
      {
        b--;
        a--;
      }
    }
  }

  //在指定位置显示一个字符,包括部分字符
  //x:0~127
  //y:0~63
  //size:选择字体 12/16/24
  //取模方式 逐列式
  void OLED_ShowChar(uint8_t x, uint8_t y, const char chr, uint8_t size1)
  {
    uint8_t i, m, temp, size2, chr1;
    uint8_t y0 = y;
    size2 = (size1 / 8 + ((size1 % 8) ? 1 : 0)) * (size1 / 2); //得到字体一个字符对应点阵集所占的字节数
    chr1 = chr - ' ';                                          //计算偏移后的值
    for (i = 0; i < size2; i++)
    {
      if (size1 == 12)
      {
        temp = pgm_read_byte(&asc2_1206[chr1][i]);
      } //调用1206字体
      else if (size1 == 16)
      {
        temp = pgm_read_byte(&asc2_1608[chr1][i]);
      } //调用1608字体
      else if (size1 == 24)
      {
        temp = pgm_read_byte(&asc2_2412[chr1][i]);
      } //调用2412字体
      else
        return;
      for (m = 0; m < 8; m++) //写入数据
      {
        if (temp & 0x80)
          OLED_DrawPoint(x, y);
        else
          OLED_ClearPoint(x, y);
        temp <<= 1;
        y++;
        if ((y - y0) == size1)
        {
          y = y0;
          x++;
          break;
        }
      }
    }
  }

  //显示字符串
  //x,y:起点坐标
  //size1:字体大小
  //*chr:字符串起始地址
  void OLED_ShowString(uint8_t x, uint8_t y, string str, uint8_t size1)
  {
    char* chr=new char[str.size()+1];
    strcpy(chr,str.c_str());
    while ((*chr >= ' ') && (*chr <= '~')) //判断是不是非法字符!
    {
      OLED_ShowChar(x, y, *chr, size1);
      x += size1 / 2;
      if (x > 128 - size1 / 2) //换行
      {
        x = 0;
        y += size1;
      }
      chr++;
    }
  }
  
  //m^n
  u32 OLED_Pow(uint8_t m, uint8_t n)
  {
    u32 result = 1;
    while (n--)
    {
      result *= m;
    }
    return result;
  }

  ////显示2个数字
  ////x,y :起点坐标
  ////len :数字的位数
  ////size:字体大小
  void OLED_ShowNum(uint8_t x, uint8_t y, int num, uint8_t len, uint8_t size1)
  {
    uint8_t t, temp;
    for (t = 0; t < len; t++)
    {
      temp = (num / OLED_Pow(10, len - t - 1)) % 10;
      if (temp == 0)
      {
        OLED_ShowChar(x + (size1 / 2) * t, y, '0', size1);
      }
      else
      {
        OLED_ShowChar(x + (size1 / 2) * t, y, temp + '0', size1);
      }
    }
  }

  //显示汉字
  //x,y:起点坐标
  //num:汉字对应的序号
  //取模方式 列行式
  void OLED_ShowChinese(uint8_t x, uint8_t y, const uint8_t num, uint8_t size1)
  {
    uint8_t i, m, n = 0, temp, chr1;
    uint8_t x0 = x, y0 = y;
    uint8_t size3 = size1 / 8;
    while (size3--)
    {
      chr1 = num * size1 / 8 + n;
      n++;
      for (i = 0; i < size1; i++)
      {
        if (size1 == 16)
        {
          temp = pgm_read_byte(&Hzk1[chr1][i]);
        } //调用16*16字体
        else if (size1 == 24)
        {
          temp = pgm_read_byte(&Hzk2[chr1][i]);
        } //调用24*24字体
        else if (size1 == 32)
        {
          temp = pgm_read_byte(&Hzk3[chr1][i]);
        } //调用32*32字体
        else if (size1 == 64)
        {
          temp = pgm_read_byte(&Hzk4[chr1][i]);
        } //调用64*64字体
        else
          return;

        for (m = 0; m < 8; m++)
        {
          if (temp & 0x01)
            OLED_DrawPoint(x, y);
          else
            OLED_ClearPoint(x, y);
          temp >>= 1;
          y++;
        }
        x++;
        if ((x - x0) == size1)
        {
          x = x0;
          y0 = y0 + 8;
        }
        y = y0;
      }
    }
  }

  //配置写入数据的起始位置
  void OLED_WR_BP(uint8_t x, uint8_t y)
  {
    OLED_WR_Byte(0xb0 + y, OLED_CMD); //设置行起始地址
    OLED_WR_Byte(((x & 0xf0) >> 4) | 0x10, OLED_CMD);
    OLED_WR_Byte((x & 0x0f), OLED_CMD);
  }

  //x0,y0：起点坐标
  //x1,y1：终点坐标
  //BMP[]：要写入的图片数组
  void OLED_ShowPicture(uint8_t x0, uint8_t y0, uint8_t x1, uint8_t y1, const uint8_t BMP[])
  {
    int j = 0;
    uint8_t t;
    uint8_t x, y;
    for (y = y0; y < y1; y++)
    {
      OLED_WR_BP(x0, y);
      for (x = x0; x < x1; x++)
      {
        t = pgm_read_byte(&BMP[j++]);
        OLED_WR_Byte(t, OLED_DATA);
      }
    }
  }

  
}