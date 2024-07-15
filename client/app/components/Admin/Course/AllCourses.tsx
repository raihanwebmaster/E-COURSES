import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Button, Box } from '@mui/material'
import { AiOutlineDelete } from 'react-icons/ai'
import { FiEdit2 } from 'react-icons/fi'
import { useTheme } from 'next-themes'
import { useGetAllCoursesQuery } from '@/redux/features/courses/coursesApi'
import Loader from '../../Loader/Loader'
import { format } from "timeago.js";

type Props = {}

const AllCourses = (props: Props) => {
  const { resolvedTheme, setTheme } = useTheme()
  const { isLoading, data, error } = useGetAllCoursesQuery({})
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Course Name", flex: 1 },
    { field: "ratings", headerName: "Ratings", flex: 0.5 },
    { field: "purchased", headerName: "Purchased", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button>
              <FiEdit2
                className="dark:text-white text-black"
                size={20}
              />
            </Button>
          </>
        );
      },
    },
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
  ];

  const rows: any[] = [];
  data?.data && data?.data.map((course: any) => {
    rows.push({
      id: course._id,
      name: course.name,
      ratings: course.ratings,
      purchased: course.purchased,
      created_at: format(course.createdAt),
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

export default AllCourses