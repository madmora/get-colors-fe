import { ClickAwayListener, Tooltip } from '@mui/material'
import HelpIcon from '@mui/icons-material/Help'
import { useState } from 'react'
import Policy from './policy'

const PasswordPolicyTooltip = () => {
  const [open, setOpen] = useState<boolean>(false)

  const handleTooltipClose = () => {
    setOpen(false)
  }

  const handleTooltipOpen = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Tooltip
        PopperProps={{
          disablePortal: true,
        }}
        onClose={handleTooltipClose}
        open={open}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        placement="top"
        title={<Policy />}
      >
        <HelpIcon
          onClick={handleTooltipOpen}
          sx={{ width: '20px', height: '20px' }}
        />
      </Tooltip>
    </ClickAwayListener>
  )
}

export default PasswordPolicyTooltip
