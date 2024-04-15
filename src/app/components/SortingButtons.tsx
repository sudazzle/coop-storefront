'use client';

import React from 'react';
import { Button } from './Button';
import { SortingOrder } from '@/app/types';

type SortingButtonsProps = {
  onSort: (order: SortingOrder) => void
}

export const SortingButtons: React.FC<SortingButtonsProps> = ({ onSort }) => {
  const [sortingOrder, setSortingOrder] = React.useState<SortingOrder>();

  const sortByAscending = () => {
    setSortingOrder(SortingOrder.ASC);
    onSort(SortingOrder.ASC);
  }

  const sortByDecending = () => {
    setSortingOrder(SortingOrder.DESC);
    onSort(SortingOrder.DESC);
  }

  return (
    <>
      <Button active={sortingOrder === SortingOrder.ASC} onClick={sortByAscending}>Sorter etter Nærmeste</Button>
      <Button active={sortingOrder === SortingOrder.DESC} onClick={sortByDecending}>Sorter etter Fjerneste</Button>
    </>
  );
}