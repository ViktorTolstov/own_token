import React, { useState, useEffect } from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { visuallyHidden } from '@mui/utils';

interface Data {
  active: boolean,
  offerType: string,
  offerId: string,
  amountAlice: number,
  feeAlice: string,
  feeBob: string,
  smallestChunkSize: string,
  minimumSize: string,
  deadline: string,
  amountRemaining: string,
  offerer: string,
  payoutAddress: string,
  tokenAlice: string,
  capabilities: Array<any>,
  amountBob: Array<any>,
  minimumOrderAmountsAlice: Array<any>,
  minimumOrderAmountsBob: Array<any>,
  minimumOrderAddresses: Array<any>,
  minimumOrderTokens: Array<any>,
  tokenBob: Array<any>,
}

function createData(
  innerData: any
): Data {
  return {
    active: innerData.active,
    offerType: innerData.offerType,
    offerId: innerData.offerId,
    amountAlice: innerData.amountAlice,
    feeAlice: innerData.feeAlice,
    feeBob: innerData.feeBob,
    smallestChunkSize: innerData.smallestChunkSize,
    minimumSize: innerData.minimumSize,
    deadline: innerData.deadline,
    amountRemaining: innerData.amountRemaining,
    offerer: innerData.offerer,
    payoutAddress: innerData.payoutAddress,
    tokenAlice: innerData.tokenAlice,
    capabilities: innerData.capabilities,
    amountBob: innerData.amountBob,
    minimumOrderAmountsAlice: innerData.minimumOrderAmountsAlice,
    minimumOrderAmountsBob: innerData.minimumOrderAmountsBob,
    minimumOrderAddresses: innerData.minimumOrderAddresses,
    minimumOrderTokens: innerData.minimumOrderTokens,
    tokenBob: innerData.tokenBob,
  };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
    a: { [key in Key]: number | string | boolean | Array<any> },
    b: { [key in Key]: number | string | boolean | Array<any> },
  ) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
  id: keyof Data;
  label: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'offerId',
    label: 'offerId',
  },
  {
    id: 'deadline',
    label: 'deadline',
  },
  {
    id: 'offerType',
    label: 'offerType',
  },
  {
    id: 'amountAlice',
    label: 'amountAlice',
  },
  {
    id: 'feeAlice',
    label: 'feeAlice',
  },
  {
    id: 'feeBob',
    label: 'feeBob',
  },
  {
    id: 'smallestChunkSize',
    label: 'smallestChunkSize',
  },
  {
    id: 'minimumSize',
    label: 'minimumSize',
  },
  {
    id: 'amountRemaining',
    label: 'amountRemaining',
  },
  {
    id: 'offerer',
    label: 'offerer',
  },
  {
    id: 'payoutAddress',
    label: 'payoutAddress',
  },
  {
    id: 'tokenAlice',
    label: 'tokenAlice',
  },
];

//   active: bool
//   capabilities: Array<any>,
//   amountBob: Array<any>,
//   minimumOrderAmountsAlice: Array<any>,
//   minimumOrderAmountsBob: Array<any>,
//   minimumOrderAddresses: Array<any>,
//   minimumOrderTokens: Array<any>,
//   tokenBob: Array<any>,

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='right'
            padding='normal'
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.id == "deadline" ? <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel> : headCell.label}

          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Offers
        </Typography>
      )}
    </Toolbar>
  );
};

export default function EnhancedTable({ contractData }: {contractData: Array<Data>}) {
  const [rows, setRows] = React.useState<Data[]>(contractData);

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('offerId');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.offerId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  // задание 7а
  const [amountAliceFilter, setAmountAliceFilter] = React.useState<number>(0);

  const handleAmountAliceFilter = (event: SelectChangeEvent) => {
    setAmountAliceFilter(Number(event.target.value));
  };

  const doAmountAliceFilter = (element: Data, index: number, array: Array<Data>) => {
    console.log(element.amountAlice);
    console.log(amountAliceFilter);
    switch (amountAliceFilter) {
      case 1:
        return element.amountAlice >= 0 && element.amountAlice < 1000
      case 2:
        return element.amountAlice >= 1000 && element.amountAlice < 100000
      case 3:
        return element.amountAlice >= 100000 && element.amountAlice < 10000000
      case 4:
        return element.amountAlice >= 10000000
      default:
        return true;
    }
  };

  useEffect(() => {
    setRows(contractData.filter(doAmountAliceFilter));
  }, [amountAliceFilter]);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rows.sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.offerId}
                    >
                      <TableCell align="right">{row.offerId}</TableCell>
                      <TableCell align="right">{parseInt(row.deadline, 10)}</TableCell>
                      <TableCell align="right">{row.offerType}</TableCell>
                      <TableCell align="right">{row.amountAlice}</TableCell>
                      <TableCell align="right">{row.feeAlice}</TableCell>
                      <TableCell align="right">{row.feeBob}</TableCell>
                      <TableCell align="right">{row.smallestChunkSize}</TableCell>
                      <TableCell align="right">{row.minimumSize}</TableCell>
                      <TableCell align="right">{row.amountRemaining}</TableCell>
                      <TableCell align="right">{row.offerer}</TableCell>
                      <TableCell align="right">{row.payoutAddress}</TableCell>
                      <TableCell align="right">{row.tokenAlice}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Box sx={{ maxWidth: 240 }}>
          <FormControl fullWidth>
            <InputLabel id="amountAliceFilter-select-label">Amount Alice Filter</InputLabel>
            <Select
              labelId="amountAliceFilter-select-label"
              id="amountAliceFilter-select"
              value={amountAliceFilter.toString()}
              label="Amount Alice Filter"
              onChange={handleAmountAliceFilter}
            >
              <MenuItem value={0}>Все</MenuItem>
              <MenuItem value={1}>от 0 до 1000</MenuItem>
              <MenuItem value={2}>от 1000 до 100 000</MenuItem>
              <MenuItem value={3}>от 100 000 до 10 000 000</MenuItem>
              <MenuItem value={4}>от 10 000 000 и выше</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>
    </Box>
  );
}
