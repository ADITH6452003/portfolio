import { useEffect, useRef, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

export default function GitHubGraph() {
  const [ref, visible] = useReveal();
  const [data, setData] = useState([]);
  
  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;

  useEffect(() => {
    fetch('https://github-contributions-api.jogruber.de/v4/ADITH6452003')
      .then(res => res.json())
      .then(resData => {
         const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
         
         // Initialize 12 months with 0 contributions for both years
         const chartData = months.map(m => ({ 
           name: m, 
           [lastYear]: 0, 
           [currentYear]: 0 
         }));
         
         // Process each day's contribution
         resData.contributions.forEach(d => {
           const [y, mStr] = d.date.split('-');
           const year = parseInt(y, 10);
           if (year === currentYear || year === lastYear) {
             const monthIndex = parseInt(mStr, 10) - 1;
             chartData[monthIndex][year] += d.count;
           }
         });
         
         setData(chartData);
      })
      .catch(console.error);
  }, [currentYear, lastYear]);

  return (
    <section id="github-graph" className="section section-alt">
      <div className="section-header">
        <span className="section-label">Consistency</span>
        <h2 className="section-title">GitHub <span className="gradient-text">Activity</span></h2>
        <p className="section-sub">Monthly coding contributions for {lastYear} and {currentYear}</p>
      </div>

      <div
        ref={ref}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          padding: '2rem',
          maxWidth: '1100px',
          margin: '0 auto',
          background: 'var(--card-bg, #1a1a1a)',
          borderRadius: '16px',
          border: '1px solid var(--border-color, rgba(255,255,255,0.1))',
          boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
        }}
      >
        {/* Last Year Graph */}
        <div style={{ height: '300px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ textAlign: 'center', color: '#8b5cf6', marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: 'bold' }}>{lastYear} Contributions</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorLastYear" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.5}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis stroke="rgba(255,255,255,0.4)" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#222', borderColor: '#444', borderRadius: '8px', color: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
                itemStyle={{ color: '#fff' }}
                cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }}
              />
              <Area type="monotone" dataKey={lastYear} stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorLastYear)" name={`${lastYear}`} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Current Year Graph */}
        <div style={{ height: '300px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ textAlign: 'center', color: '#10b981', marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: 'bold' }}>{currentYear} Contributions</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCurrentYear" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.5}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis stroke="rgba(255,255,255,0.4)" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#222', borderColor: '#444', borderRadius: '8px', color: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
                itemStyle={{ color: '#fff' }}
                cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }}
              />
              <Area type="monotone" dataKey={currentYear} stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorCurrentYear)" name={`${currentYear}`} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
