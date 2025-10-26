
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import Layout from '../components/Layout';
import { Plus, FileText, Calendar, MapPin, Clock } from 'lucide-react';

interface Report {
  id: string;
  fkdmId: string;
  fullName: string;
  bidang: string;
  instansi: string;
  hari: string;
  tanggal: string;
  jam: string;
  lokasi: string;
  jenisKegiatan: string;
  dataInfo: string;
  deskripsi: string;
  saranTL: string;
  foto?: string;
  createdAt: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    // Load reports from localStorage
    const savedReports = localStorage.getItem('fkdm_reports');
    if (savedReports) {
      setReports(JSON.parse(savedReports));
    }
  }, []);

  const recentReports = reports.slice(0, 5);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 rounded-lg border border-border/50">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Selamat Datang, {user?.fullName}
          </h1>
          <p className="text-muted-foreground">
            Kelola laporan kegiatan FKDM Anda dengan mudah dan efisien
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="hover:shadow-md transition-shadow border-border/50">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Plus className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">Buat Laporan</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                Buat laporan kegiatan FKDM baru
              </CardDescription>
              <Link to="/create-report">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Buat Laporan Baru
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow border-border/50">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <div className="bg-secondary/10 p-2 rounded-lg">
                  <FileText className="h-5 w-5 text-secondary" />
                </div>
                <CardTitle className="text-lg">Total Laporan</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground mb-2">
                {reports.length}
              </div>
              <CardDescription>
                Laporan yang telah dibuat
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow border-border/50">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <div className="bg-accent/10 p-2 rounded-lg">
                  <Calendar className="h-5 w-5 text-accent" />
                </div>
                <CardTitle className="text-lg">Bulan Ini</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground mb-2">
                {reports.filter(r => {
                  const reportDate = new Date(r.createdAt);
                  const now = new Date();
                  return reportDate.getMonth() === now.getMonth() && 
                         reportDate.getFullYear() === now.getFullYear();
                }).length}
              </div>
              <CardDescription>
                Laporan bulan ini
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Recent Reports */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Laporan Terbaru</span>
            </CardTitle>
            <CardDescription>
              5 laporan kegiatan terbaru yang telah dibuat
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentReports.length > 0 ? (
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/30">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-foreground">{report.jenisKegiatan}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {report.bidang}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{report.tanggal}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{report.jam}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{report.lokasi}</span>
                        </div>
                      </div>
                    </div>
                    <Link to={`/view-report/${report.id}`}>
                      <Button variant="outline" size="sm">
                        Lihat
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">Belum ada laporan yang dibuat</p>
                <Link to="/create-report">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Buat Laporan Pertama
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}