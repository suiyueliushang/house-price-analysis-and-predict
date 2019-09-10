from statsmodels.tsa.arima_model import ARIMA
import pmdarima as pm
import pandas as pd
import numpy as np
def price_forecast(list,length,a):
    '''@author:suiyueliushang\n
    @date:2019/9/9\n
	@args:list 传递某个城市地区的连续均价数据\n
	length:预测多少月\n
	a:置信区间\n
	@return:dataframe:\n
	               0             1             2
	0   29040.442711  28459.100886  29621.784537
	1   29170.792822  28104.500989  30237.084655
	2   29324.408864  27819.542132  30829.275596
	第一列为预测价格
	第二列为置信区间下界
	第三列为置信区间上界
    '''
    df=pd.DataFrame(list,columns=['value'])
    model = pm.auto_arima(df.value, start_p=1, start_q=1,
                      test='adf',       # use adftest to find optimal 'd'
                      max_p=3, max_q=3, # maximum p and q
                      m=1,              # frequency of series
                      d=None,           # let model determine 'd'
                      seasonal=False,   # No Seasonality
                      start_P=0, 
                      D=0, 
                      trace=True,
                      error_action='ignore',  
                      suppress_warnings=True, 
                      stepwise=True)
    
    fc, conf = model.predict(n_periods=length,alpha=1-a ,return_conf_int=True)
    conf=pd.DataFrame(conf,columns=['1','2'])
    fc=pd.DataFrame(fc)
    ret=pd.merge(fc,conf,left_index=True,right_index=True)
    return ret