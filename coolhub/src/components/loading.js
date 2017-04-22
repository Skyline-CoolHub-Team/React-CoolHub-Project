import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import CircularProgress from 'material-ui/CircularProgress'

const Loading = (props) => props.loading && (
  <div style={{ position: 'absolute', top: '50%', left: '47%'}}>
    <MuiThemeProvider>
      <CircularProgress />
    </MuiThemeProvider>
  </div>
)
export default Loading
