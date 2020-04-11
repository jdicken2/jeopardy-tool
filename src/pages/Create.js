import React from 'react';
import styled from 'styled-components';

import BoardMaker from 'Components/BoardMaker';
import Container from '@material-ui/core/Container';

const StyledContainer = styled(Container)`
    margin-bottom: 4rem;
`;

export default function Create() {
    return (
        <StyledContainer maxWidth="md">
            <BoardMaker />
        </StyledContainer>
    );
}
