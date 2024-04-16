"use client";
import { useEffect, useState, useMemo } from "react";
import styles from "./page.module.css";

//Store
import { useStore } from "@/store/banks/useStore";

//Components
import { Menu, TableBank } from './components/index'

export default function Home() {

  const data = useStore((state: any) => state.banks);
  const setBanks = useStore((state: any) => state.setBanks);
  const setLoading = useStore((state: any) => state.setLoading);

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

  function refreshData() {
    setBanks(JSON.parse(localStorage.getItem("localBanks") || '{}'));
  }

  function sortTable() {
    let newData = data.sort((a: any, b: any) => { return (a.bankName < b.bankName) ? -1 : 1 });
    setBanks(newData);
  }
  

  const [filterValue, setFilterValue] = useState('');

  const filteredBanks = useMemo(() => {
    return data.filter((bank: any) => bank.bankName.toLowerCase().includes(filterValue.toLowerCase()));
  }, [data, filterValue]);

  return (
    <main className={styles.main}>
      <Menu refreshData={refreshData} sortTable={sortTable} setFilterValue={setFilterValue} />
      <TableBank filteredBanks={filteredBanks} />
    </main>
  );
}
