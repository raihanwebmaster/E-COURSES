"use client"
import React, {FC, useState} from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Button, Box } from '@mui/material'
import { AiOutlineDelete, AiOutlineMail } from 'react-icons/ai'
import Loader from '../../Loader/Loader'
import { format } from "timeago.js";
import { useGetAllUsersQuery } from '@/redux/features/user/userApi'
import { useTheme } from 'next-themes'
import { styles } from '@/app/styles/styles'

type Props = {
  isTeam : boolean
}

const AllUsers:FC<Props> = ({isTeam}) => {
  const { resolvedTheme } = useTheme()
  const [active, setActive] = useState(false)
  const { isLoading, data, error } = useGetAllUsersQuery({})
  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.5 },
    { field: "courses", headerName: "Purchased Courses", flex: 0.5 },
    { field: "created_at", headerName: "Joined At", flex: 0.5 },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button>
              <AiOutlineDelete
                className="dark:text-white text-black"
                size={20}
              />
            </Button>
          </>
        );
      },
    },
    {
      field: "sendMail",
      headerName: "Email",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <a href={`mailto:${params.row.email}`} className="flex items-center h-full" >
              <AiOutlineMail
                className="dark:text-white text-black"
                size={20}
              />
            </a>
          </>
        );
      },
    },
  ];

  const rows: any[] = [];
  data?.data && data?.data.forEach((user: any) => {
    if (!isTeam || (isTeam && user.role === 'admin')) {
      rows.push({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        courses: user.courses.length,
        created_at: format(user.createdAt),
      });
    }
  });

  return (
    <div className='mt-[120px]'>
      {
        isLoading ? (
          <Loader />
        ) : (
          <Box m="20px">
            <div className="w-[80%] flex justify-end cursor-pointer" onClick={()=> setActive(!active)}>
                <div className={`${styles.button} !w-[250px] !h-[35px] dark:bg-[#57c7a3] dark:border-[#ffffff6c]`} >
                    Add New Member
                </div>
              </div>
            <Box
              m="40px 0 0 0"
              height="80vh"
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
              <DataGrid checkboxSelection columns={columns} rows={rows} />
            </Box>
          </Box>
        )
      }
    </div>
  )
}

export default AllUsers