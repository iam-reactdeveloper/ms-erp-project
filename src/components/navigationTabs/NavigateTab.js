import React from 'react'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { TabContainer, TabMainContainer } from './NavitagtionTab.Styles'

export const NavigateTab = (props) => {
  const { data } = props  
  const [value, setValue] = React.useState("1")

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div>
      <TabContext value={value}>
        <TabMainContainer>
          <TabList onChange={handleChange}>
            {data?.map((item, index) => (<TabContainer label={item.label} value={String(index + 1)} key={index} />))}
          </TabList>
        </TabMainContainer>
        {data?.map((item, index) => (
          <TabPanel value={String(index + 1)} key={index}>{item.data}</TabPanel>
        ))}
      </TabContext>
    </div>
  )
}
