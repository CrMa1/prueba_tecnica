"use client";
import { useEffect, useState, useMemo } from "react";
import styles from "./page.module.css";

//Store
import { useStore } from "@/store/banks/useStore";

//Components
import { Menu, ShowAlert, TableBank } from './components/index'

export default function Home() {

  //Store
  const data = useStore((state: any) => state.banks);
  const setBanks = useStore((state: any) => state.setBanks);
  const setLoading = useStore((state: any) => state.setLoading);

  //Var for filter
  const [filterValue, setFilterValue] = useState('');

  //Alerts
  const [open, setOpen] = useState(false);
  const [alertText, setAlertText] = useState('');

  //Get Data
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        "https://dev.obtenmas.com/catom/api/challenge/banks"
      );
      const newData = await res.json();
      localStorage.setItem("localBanks", JSON.stringify(newData))
      setBanks(newData);
      setLoading(false);
    }
    fetchData();
  }, [setBanks, setLoading]);

  //Refresh Table
  function refreshData() {
    setBanks(JSON.parse(localStorage.getItem("localBanks") || '{}'));
  }

  //Sort Table
  function sortTable() {
    let newData = data.sort((a: any, b: any) => { return (a.bankName < b.bankName) ? -1 : 1 });
    setBanks(newData);
  }
  
  //Remove item
  function deleteBank(removeBank: any) {
    const newArray = data.filter((bank: any) => bank.bankName !== removeBank);
    setBanks(newArray);
    setAlertText(removeBank+' was deleted successfully')
    setOpen(true);
  }

  //Remove alert
  const handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  //Filter banks
  const filteredBanks = useMemo(() => {
    return data.filter((bank: any) => bank.bankName.toLowerCase().includes(filterValue.toLowerCase()));
  }, [data, filterValue]);

  return (
    <main className={styles.main}>
      <ShowAlert open={open} alertType={'success'} alertText={alertText} handleClose={handleClose} />
      <Menu refreshData={refreshData} sortTable={sortTable} setFilterValue={setFilterValue} />
      <TableBank filteredBanks={filteredBanks} deleteBank={deleteBank} />
    </main>
  );
}
