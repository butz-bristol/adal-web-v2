import {
  Autocomplete,
  CircularProgress,
  FormControl,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TextField,
  Toolbar,
} from '@mui/material';
import { IconSearch } from '@tabler/icons-react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import LoadingScreen from 'src/components/LoadingScreen';

const ManageOrder = ({
  addSelectedItemToCart,
  searchQuery,
  handleSearchInput,
  foundProducts,
  isFetchingFoundProducts,
  isCreatingTransaction,
  renderEditCartItemModal,
  renderOrderNumber,
  renderCartTableHead,
  renderCartTableBody,
  renderMakeTransactionButton,
}) => {
  const [openSearchResult, setOpenSearchResult] = useState(false);

  // PERF:
  // Catch newline char then select on resolution of async
  // request of getFoundProducts

  return (
    <>
      {renderEditCartItemModal()}
      {isCreatingTransaction && <LoadingScreen />}
      <div className="search">
        <FormControl variant="outlined" fullWidth>
          <Autocomplete
            open={openSearchResult}
            onOpen={() => setOpenSearchResult(true)}
            onClose={() => setOpenSearchResult(false)}
            loading={isFetchingFoundProducts}
            options={foundProducts}
            getOptionLabel={(product) =>
              `${product.productName} - ${product.productSKU}`
            }
            isOptionEqualToValue={(product, value) =>
              value && value._id ? product._id === value._id : false
            }
            filterOptions={(x) => x}
            inputValue={searchQuery}
            onInputChange={(event) => {
              if (event && event.type === 'change') {
                handleSearchInput(event.target.value);
              }
            }}
            onChange={(_event, newValue) => {
              if (newValue) {
                addSelectedItemToCart(newValue);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                id="outlined-basic"
                variant="outlined"
                fullWidth
                label="Search for a product"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {isFetchingFoundProducts ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : (
                        <IconSearch stroke={1.5} size="1.5rem" />
                      )}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
        </FormControl>
      </div>

      {renderOrderNumber()}

      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>{renderCartTableHead()}</TableHead>
            <TableBody>{renderCartTableBody()}</TableBody>
          </Table>
        </TableContainer>

        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          {renderMakeTransactionButton(makeTransactionButton)}
        </Toolbar>
      </div>
    </>
  );
};

ManageOrder.propTypes = {
  addSelectedItemToCart: PropTypes.func,
  searchQuery: PropTypes.string,
  handleSearchInput: PropTypes.func,
  foundProducts: PropTypes.array,
  isFetchingFoundProducts: PropTypes.bool,
  isCreatingTransaction: PropTypes.bool,
  renderEditCartItemModal: PropTypes.func,
  renderOrderNumber: PropTypes.func,
  renderCartTableHead: PropTypes.func,
  renderCartTableBody: PropTypes.func,
  renderMakeTransactionButton: PropTypes.func,
};

export default ManageOrder;
