import React from 'react'
import Image from "next/image";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";

import { useStore } from "@/store/banks/useStore";

import styles from "./TableBank.module.css";

const TableBank = ({filteredBanks}) => {
  
  const isLoading = useStore((state) => state.isLoading);
 
  return (
    <>
      <TableContainer component={Paper} style={{marginTop:10}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Bank</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Age</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow
                key="1"
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell colSpan={4} rowSpan={4}>
                  <Skeleton animation="wave" variant="rectangular" height={400} />
                </TableCell>
              </TableRow>
            ) : (
              filteredBanks.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Image
                      unoptimized
                      src={row.url}
                      width={70}
                      height={60}
                      alt="Picture of bank"
                      className={styles.pickBank}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.bankName}
                  </TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.age}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default TableBank