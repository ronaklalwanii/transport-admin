import { useSelector } from "react-redux";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from "@mui/material";

const Dashboard = () => {
  const { activeDrivers, activeTrucks, reports, tripsHistory } = useSelector(
    (state) => state.dashboard
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={500}>
              Active Drivers
            </Typography>
            <List>
              {activeDrivers.map((driver) => (
                <ListItem
                  key={driver.id}
                  sx={{ borderBottom: "1px solid #ddd" }}
                >
                  <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                    {driver.name[0]}
                  </Avatar>
                  <ListItemText
                    primary={`${driver.name} (${driver.status})`}
                    secondary={`Truck: ${driver.truckNumber}, Destination: ${driver.destination}`}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={500}>
              Active Trucks
            </Typography>
            <List>
              {activeTrucks.map((truck) => (
                <ListItem
                  key={truck.id}
                  sx={{ borderBottom: "1px solid #ddd" }}
                >
                  <Avatar sx={{ bgcolor: "info.main", mr: 2 }}>
                    {truck.model[0]}
                  </Avatar>
                  <ListItemText
                    primary={`${truck.model} (${truck.status})`}
                    secondary={`Truck No: ${truck.truckNumber}, Capacity: ${truck.capacity}, Location: ${truck.location}`}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={500}>
              Reports
            </Typography>
            {reports.length === 0 ? (
              <Typography sx={{ textAlign: "center", fontStyle: "italic" }}>
                No reports available
              </Typography>
            ) : (
              <List>
                {reports.map((report, index) => (
                  <ListItem key={index} sx={{ borderBottom: "1px solid #ddd" }}>
                    <ListItemText
                      primary={report.title}
                      secondary={report.description}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={500}>
              Trips History
            </Typography>
            <List>
              {tripsHistory.map((trip) => (
                <ListItem key={trip.id} sx={{ borderBottom: "1px solid #ddd" }}>
                  <ListItemText
                    primary={`From: ${trip.startingPoint} To: ${trip.destination}`}
                    secondary={`Date: ${trip.date}`}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
