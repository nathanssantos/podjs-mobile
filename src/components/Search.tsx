import { Box, Input, InputField, InputIcon, InputSlot, SearchIcon } from '@gluestack-ui/themed';
import React from 'react';

type SearchProps = {
  value: string;
  onChangeText: (text: string) => void;
};

const Search = ({ value, onChangeText }: SearchProps) => {
  return (
    <Box p={16}>
      <Input>
        <InputSlot pl='$3'>
          <InputIcon as={SearchIcon} />
        </InputSlot>
        <InputField placeholder='Search...' value={value} onChangeText={onChangeText} />
      </Input>
    </Box>
  );
};

export default Search;
