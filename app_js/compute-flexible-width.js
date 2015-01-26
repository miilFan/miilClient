/** apricot.R = 1 **/
function computeFlexibleWidth(column, margins, stage_width, min_width, max_width) {
  /**
  column: 標準カラム指定
  margins: margin-left, margin-right を要素に持つ配列
  stage_width: 表示領域の横幅
  min_width: multi column の場合の最小横幅
             この値より小さい横幅になる場合はカラムをさらに少なくする
  max_width: multi column の場合の最大横幅
             この値より大きい横幅になる場合はカラムを増やす
  返り値: width, margin-left, margin-right, column を要素に持つ配列 
  */
  if(column == 0) column = 1;
  var c, ml, mr, m, w, W;
  c = column;
  ml = margins[0];
  mr = margins[1];
  m = ml + mr;
  W = stage_width;

  /* 標準カラムでのカードの横幅を計算 */
  w = (W - (c + 1)*m) / c;

　　var flag = 0;
  if(w < min_width) flag = 1;
  else if(w > max_width) flag = 2;
  else if(min_width <= w && w <= max_width) flag = 3;

  switch(flag) {
    case 3:
        break;

    case 2:
        /**
        カラム数を増やす。 wがmax_widthを超えなくなったところで完了。 
        wがmin_widthを下回った場合は、カラムを一つ減らし、余白を調整する。
        */
        while(w > max_width) {
          c++;
          w = (W - (c + 1)*m) / c;
        }
        if(w < min_width) {
          c--;
          w = (W - (c + 1)*m) / c;
          ms = W - c*w;
          m = ms / (c + 1);
          ml = m / 2;
          mr = m / 2;
        }
        break; 

    case 1:
        /* カラムを少なくする */
        var i = c;
        while(1) {
          w = (W - (i + 1)*m) / i;
          if(min_width <= w || i == 1) {
            c = i;
            break;
          }
          i--;
        }
        break;

    default: break;
  }

  return [w, ml, mr, c];
}