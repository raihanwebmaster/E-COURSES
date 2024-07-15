import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Button, Box } from '@mui/material'
import { AiOutlineDelete, AiOutlineMail } from 'react-icons/ai'
import { useTheme } from 'next-themes'
import Loader from '../../Loader/Loader'
import { format } from "timeago.js";
import { useGetAllUsersQuery } from '@/redux/features/user/userApi'

type Props = {}

const AllUsers = (props: Props) => {
  const { resolvedTheme, setTheme } = useTheme()
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
      field: " ",
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
  data?.data && data?.data.map((course: any) => {
    rows.push({
      id: course._id,
      name: course.name,
      email: course.email,
      role: course.role,
      courses: course.courses.length,
      created_at: format(course.created_at),
    })
  })

  return (
    <div className='mt-[120px]'>
      {
        isLoading ? (
          <Loader />
        ) : (
          <Box m="20px">
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