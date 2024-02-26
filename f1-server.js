const express = require('express');
const supa = require('@supabase/supabase-js')
const app = express();

const supaURL = 'https://jafhhxiqizrykkrwzsxv.supabase.co';
const supaAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphZmhoeGlxaXpyeWtrcnd6c3h2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg3MTU1NzYsImV4cCI6MjAyNDI5MTU3Nn0.B_X1AFZL_BJQWfRZAof8o9JPe3HsCssWeXSLH6nRqGc';

const supabase = supa.createClient(supaURL, supaAnonKey);

// API Endpoint 1
app.get('/api/seasons', async (req, res) => {
    const {data, error} = await supabase
        .from('seasons')
        .select();
        if (error || data.length === 0) {
            res.status(404).json({ error : "Season not found" });
        }  else {
        res.send(data);
    }
});

// API Endpoint 2
app.get('/api/circuits', async (req, res) => {
    const {data, error} = await supabase
        .from('circuits')
        .select();
    
        if (error || data.length === 0) {
            res.status(404).json({ error : "Circuit not found" });
        } else {
        res.send(data);
    }
});

// API Endpoint 3
app.get('/api/circuits/:ref', async (req, res) => {
    const {data, error} = await supabase
        .from('circuits')
        .select(`
            circuitId, name, location, country, url
        `)
        .eq('circuitRef', req.params.ref);
    
    if (error || data.length === 0) {
        res.status(404).json({ error : "Circuit not found" });
    } else {
        res.send(data);
    }
});

// API Endpoint 4
app.get('/api/circuits/season/:year', async (req, res) =>{
    const {data, error} = await supabase
        .from('races')
        .select('circuits (name, location, country ), year')
        .eq('year', req.params.year)
        .order('round', { ascending: true });
    
    if (error || data.length === 0) {
        res.status(404).json({ error : "Circuit not found" });
    }  else {
        res.send(data);
    }
})

// API Endpoint 5
app.get('/api/constructors', async (req, res) => {
    const {data, error} = await supabase
        .from('constructors')
        .select();
    
    if (error || data.length === 0) {
        res.status(404).json({ error : "Constructor not found" });
    } else {
        res.send(data);
    }
})

// API Endpoint 6
app.get('/api/constructors/:ref', async (req, res) => {
    const {data, error} = await supabase
        .from('constructors')
        .select()
        .eq('constructorRef', req.params.ref);
    
    if (error || data.length === 0) {
        res.status(404).json({ error : "Constructor not found" });
    } else {
        res.send(data);
    }
})

// API Endpoint 7 
app.get('/api/drivers', async (req, res) => {
    const {data, error} = await supabase
        .from('drivers')
        .select();
    
    if (error || data.length === 0) {
        res.status(404).json({ error : "Driver not found" });
    } else {
        res.send(data);
    }
})

// API Endpoint 8
app.get('/api/drivers/:ref', async (req, res) => {
    const {data, error} = await supabase
        .from('drivers')
        .select()
        .eq('driverRef', req.params.ref);
    
    if (error || data.length === 0) {
        res.status(404).json({ error : "Driver not found" });
    }  else {
        res.send(data);
    }
})

// API Endpoint 9 
app.get('/api/drivers/search/:substring', async (req, res) => {
    const {data, error} = await supabase
        .from('drivers')
        .select()
        .ilike('forename', `%${req.params.substring}%`);
    
    if (error || data.length === 0) {
        res.status(404).json({ error : "Driver not found" });
    }  else {
        res.send(data);
    }
})

// API Endpoint 10
app.get('/api/drivers/race/:raceId', async (req, res) => {
    const {data, error} = await supabase
        .from('results')
        .select()
        .eq('raceId', req.params.raceId)
        .order('positionOrder', { ascending: true });
    
    if (error || data.length === 0) {
        res.status(404).json({ error : "Driver not found" });
    }  else {
        res.send(data);
    }
});

// API Endpoint 11
app.get('/api/races/:raceId', async (req, res) => {
    const {data, error} = await supabase
        .from('races')
        .select(`
            circuits ( name, location, country ), year, name
        `)
        .eq('raceId', req.params.raceId);
    
    if (error || data.length === 0) {
        res.status(404).json({ error : "Race not found" });
    }  else {
        res.send(data);
    }
});

// API Endpoint 12
app.get('/api/races/season/:year', async (req, res) => {
    const {data, error} = await supabase
        .from('races')
        .select('name, seasons ( year )')
        .eq('year', req.params.year)
        .order('round', { ascending: true });
    
    if (error || data.length === 0) {
        res.status(404).json({ error : "Race not found" });
    }  else {
        res.send(data);
    }
});

// API Endpoint 13
app.get('/api/races/season/:year/:round', async (req, res) => {
    const {data, error} = await supabase
        .from('races')
        .select()
        .eq('year', req.params.year)
        .eq('round', req.params.round)
        .order('round', { ascending: true });
    
    if (error || data.length === 0) {
        res.status(404).json({ error : "Race not found" });
    }  else {
        res.send(data);
    }
})

// API Endpoint 14
app.get('/api/races/circuits/:ref', async (req, res) => {
    const {data, error} = await supabase
        .from('races')
        .select(`
            raceId, year, circuits!inner ( circuitRef, name )
        `)
        .eq('circuits.circuitRef', req.params.ref)
        .order('year', { ascending: true });
    
    if (error || data.length === 0) {
        res.status(404).json({ error : "Circuit not found" });
    }  else {
        res.send(data);
    }
})

// API Endpoint 15
app.get('/api/races/circuits/:ref/season/:start/:end', async (req, res) => {
    const {data, error} = await supabase
        .from('races')
        .select(`
            raceId, year, circuits!inner ( circuitRef, name )
        `)
        .eq('circuits.circuitRef', req.params.ref)
        .gte('year', req.params.start)
        .lte('year', req.params.end)
        .order('year', { ascending: true });
    
    if (error || data.length === 0) {
        res.status(404).json({ error : "Circuit not found" });
    } else {
        res.send(data);
    }
})

// API Endpoint 16
app.get('/api/results/:raceId', async (req, res) => {
    const {data, error} = await supabase
        .from('results')
        .select(`
            drivers ( driverRef, code, forename, surname ), races ( name, round, year, date ), constructors ( name, constructorRef, nationality )
        `)
        .eq('raceId', req.params.raceId)
        .order('grid', { ascending: true });
    
    if (error || data.length === 0) {
        res.status(404).json({ error : "Circuit not found" });
    }  else {
        res.send(data);
    }
})

// API Endpoint 17 
app.get('/api/results/driver/:ref', async (req, res) => {
    const {data, error} = await supabase
        .from('results')
        .select(`
            drivers!inner ( driverRef, code, forename, surname )
        `)
        .eq('drivers.driverRef', req.params.ref);
    
    if (error || data.length === 0) {
        res.status(404).json({ error : "Driver not found" });
    }  else {
        res.send(data);
    }
});

// API Endpoint 18
app.get('/api/results/driver/:ref/seasons/:start/:end', async (req, res) => {
    const {data, error} = await supabase
        .from('results')
        .select(`
            drivers!inner ( driverRef, code, forename, surname ), races!inner ( name, round, year, date )
        `)
        .eq('drivers.driverRef', req.params.ref)
        .gte('races.year', req.params.start)
        .lte('races.year', req.params.end);

    if (error || data.length === 0) {
        res.status(404).json({ error : "Driver not found" });
    }  else {
        res.send(data);
    }
})

// API Endpoint 19
app.get('/api/qualifying/:raceId', async (req, res) => {
    const {data, error} = await supabase
        .from('qualifying')
        .select()
        .eq('raceId', req.params.raceId)
        .order('position', { ascending: true });
    
    if (error || data.length === 0) {
        res.status(404).json({ error : "Race not found" });
    }  else {
        res.send(data);
    }
})

// API Endpoint 20 NOT DONE YET
app.get('/api/standings/:raceId/drivers', async (req, res) => {
    const { data, error } = await supabase
        .from('driverStandings')
        .select(`
            drivers( forename, surname ), * , races( name, year, results( points, position ) )
        `)
        .eq('raceId', req.params.raceId)
        .order('position', { ascending: true });

    if (error || data.length === 0) {
        res.status(404).json({ error : "Information not found" });
    }  else {
        res.send(data);
    }
});

// API Endpoint 21 
app.get('/api/standings/:raceId/constructors', async (req, res) => {
    const { data, error } = await supabase
        .from('constructorStandings')
        .select(`
            constructors( name ), points, wins, races ( name, year, results ( points, position ) )
        `)
        .eq('raceId', req.params.raceId)
        .order('position', { ascending: true });

    if (error || data.length === 0) {
        res.status(404).json({ error : "Information not found" });
    }  else {
        res.send(data);
    }
});


app.listen(8080, () => {
    console.log('listening on port 8080');
})