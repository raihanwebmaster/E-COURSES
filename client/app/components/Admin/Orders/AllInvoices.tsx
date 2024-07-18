import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useTheme } from "next-themes";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import { AiOutlineMail } from "react-icons/ai";
import { useGetAllOrdersQuery } from "@/redux/features/orders/ordersApi";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

type Props = {
  isDashboard?: boolean;
};

const AllInvoices = ({ isDashboard }: Props) => {
  const { resolvedTheme } = useTheme()
  const { isLoading, data } = useGetAllOrdersQuery({});

  const [orderData, setOrderData] = useState<any>([]);

  useEffect(() => {
    if (data) {
      const temp = data.data.map((item: any) => {
        return {
          ...item,
          userName: item?.user?.name,
          userEmail: item?.user?.email,
          title: item?.course?.name,
          price: "$" + item?.course?.price,
        };
      });
      setOrderData(temp);
    }
  }, [data]);

  const columns: any = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "userName", headerName: "Name", flex: isDashboard ? 0.6 : 0.5 },
    ...(isDashboard
      ? []
      : [
        { field: "userEmail", headerName: "Email", flex: 1 },
        { field: "title", headerName: "Course Title", flex: 1 },
      ]),
    { field: "price", headerName: "Price", flex: 0.5 },
    ...(isDashboard
      ? [{ field: "created_at", headerName: "Created At", flex: 0.5 }]
      : [
        {
          field: " ",
          headerName: "Send Email",
          flex: 0.2,
          renderCell: (params: any) => {
            return (
              <a href={`mailto:${params.row.userEmail}`} className="flex items-center h-full">
                <AiOutlineMail
                  className="dark:text-white text-black"
                  size={20}
                />
              </a>
            );
          },
        },
      ]),
  ];

  const rows: any = [];

  orderData &&
    orderData.forEach((item: any) => {
      rows.push({
        id: item._id,
        userName: item.userName,
        userEmail: item.userEmail,
        title: item.title,
        price: item.price,
        created_at: format(item.createdAt),
      });
    });

  return (
    <div className={!isDashboard ? "mt-[120px]" : "mt-[0px]"}>
      {isLoading ? (
        <Loader />
      ) : (
        <Box m={isDashboard ? "0" : "40px"}>
          <Box
            m={isDashboard ? "0" : "40px 0 0 0"}
            height={isDashboard ? "35vh" : "90vh"}
            overflow={"hidden"}
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: resolvedTheme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: resolvedTheme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-row": {
                color: resolvedTheme === "dark" ? "#fff" : "#000",
                borderBottom:
                  resolvedTheme === "dark"
                    ? "1px solid #ffffff30!important"
                    : "1px solid #ccc!important",
              },
              "& .MuiTablePagination-root": {
                color: resolvedTheme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none!important",
                "&:focus": {
                  outline: "none !important",
                },
                "&:focus-within": {
                  outline: "none !important",
                },
              },
              "& .name-column--cell": {
                color: resolvedTheme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: resolvedTheme === "dark" ? "#3e4396" : "#A4A9FC",
                borderBottom: "none",
                color: resolvedTheme === "dark" ? "#fff" : "#000",
                "&:focus": {
                  outline: "none !important",
                },
                "&:focus-within": {
                  outline: "none !important",
                },
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: resolvedTheme === "dark" ? "#1F2A40" : "#F2F0F0",
              },
              "& .MuiDataGrid-footerContainer": {
                color: resolvedTheme === "dark" ? "#fff" : "#000",
                borderTop: "none",
                backgroundColor: resolvedTheme === "dark" ? "#3e4396" : "#A4A9FC",
              },
              "& .MuiCheckbox-root": {
                color:
                  resolvedTheme === "dark" ? `#b7ebde !important` : `#000 !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `#fff !important`,
              },
            }}
          >
            <DataGrid
              checkboxSelection={isDashboard ? false : true}
              rows={rows}
              columns={columns}
              components={isDashboard ? {} : { Toolbar: GridToolbar } as any}
            />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllInvoices;
