import React from 'react'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/pt-br'
import { 
    Grid, 
    Box, 
    Typography, 
    useTheme,
    useMediaQuery,
    Paper
} from '@material-ui/core'
import useStyles from './style'

function HomeContent({ news }) {
    const classes = useStyles()
    const theme = useTheme()
    const history = useHistory()

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'), {
        defaultMatches: true
    })

    return (
        <Box
        component={Grid}
        item
        pr={isMobile ? 0 : 0.4}
        md={8}
        xs={12}>
            <Box
            component={Grid}
            item
            display={isMobile ? "none" : null}
            pb={1.2}
            xs={12}>
                <Box
                component={Paper}
                className={classes.gridAntihack}
                height={160}
                elevation={5}
                onClick={ () => {
                    history.push("antihack")
                }}>
                </Box>
            </Box>

            {news
            .sort((a, b) => a.createdAt < b.createdAt ? 1 : -1) //sort by createdAt
            .map(New => { return (
                <Box
                key={New._id}
                component={Grid}
                item
                pb={1.2}
                xs={12}>
                    <Box
                    component={Paper}
                    overflow="hidden"
                    elevation={5}>
                        <Box
                        bgcolor="white"
                        display="flex"
                        alignItems="center"
                        p={2}>
                            <img 
                            className={classes.authorImage}
                            src={"https://cravatar.eu/avatar/" + New.author + "/70.png"} 
                            alt="author" />
                            <Box>
                                <Box 
                                fontSize={16} 
                                fontWeight={600}>
                                    {New.author}
                                </Box>
                                <Box 
                                fontSize={14}>
                                    {moment(New.createdAt).format('LL')}
                                </Box>
                            </Box>
                        </Box>
                        
                        <Box
                        className={classes.newTitle}
                        bgcolor="#262626"
                        p={3}
                        onClick={() => { 
                            history.push("novidades/" + New.slug);
                        }}>
                            <Box 
                            display="inline"
                            color="white" 
                            fontSize={18}>
                                {New.subtitle}
                            </Box><br/>
                            <Box 
                            display="inline"
                            color="white"
                            fontWeight="bold"
                            lineHeight={1} 
                            fontSize={26}>
                                {New.title}
                            </Box>
                        </Box>
                        
                        <Box
                        bgcolor="white"
                        p={2.5}>
                            <Typography>
                                {New.content}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            )})}
        </Box>
    )
}

export default HomeContent
