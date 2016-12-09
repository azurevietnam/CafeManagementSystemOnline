# CafeManagementSystemOnline
Dự án quản lý và giới thiệu quán cafe trực tuyến
# Cách mở:
- Tải dự án trên nhánh brancher_1
- Restore file CafeOnline/Assets/CafeOnline.bak vào MS SQL 2014
- Chỉnh cấu hình server theo máy trong CafeOnline/Web.config 
  + Trong thẻ   <connectionStrings> đổi tên server trong chuỗi:
  
  "<add name="CafeOnlineDB" connectionString="data source=THEBOSSPC\THEBOSSPC;initial catalog=CafeOnline;integrated security=True;MultipleActiveResultSets=True;App=EntityFramework" providerName="System.Data.SqlClient" />"
  
