import { useState, useRef } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { CheckSquare, Camera, MapPin, Clock, Calendar } from 'lucide-react';
import { User } from '../../App';
import { toast } from 'sonner@2.0.3';

interface StudentAttendanceProps {
  user: User;
}

const mockAttendanceHistory = [
  { date: '2025-11-22', status: 'Present', method: 'Manual' },
  { date: '2025-11-21', status: 'Present', method: 'Selfie' },
  { date: '2025-11-20', status: 'Absent', method: '-' },
  { date: '2025-11-19', status: 'Present', method: 'Manual' },
  { date: '2025-11-18', status: 'Present', method: 'Selfie' }
];

export function StudentAttendance({ user }: StudentAttendanceProps) {
  const [selfieData, setSelfieData] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (error) {
      toast.error('Unable to access camera');
    }
  };

  const captureSelfie = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageData = canvas.toDataURL('image/png');
        setSelfieData(imageData);
        
        // Stop camera
        const stream = videoRef.current.srcObject as MediaStream;
        stream?.getTracks().forEach(track => track.stop());
        setIsCameraActive(false);
      }
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = `${position.coords.latitude.toFixed(4)}°N, ${position.coords.longitude.toFixed(4)}°E`;
          setLocation(loc);
          toast.success('Location captured');
        },
        () => {
          toast.error('Unable to get location');
        }
      );
    } else {
      toast.error('Geolocation not supported');
    }
  };

  const handleSubmitAttendance = () => {
    if (!selfieData) {
      toast.error('Please capture a selfie');
      return;
    }
    if (!location) {
      toast.error('Please capture your location');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSelfieData(null);
      setLocation(null);
      toast.success('Attendance submitted for approval');
    }, 1500);
  };

  const attendancePercentage = Math.round(
    (mockAttendanceHistory.filter(a => a.status === 'Present').length / mockAttendanceHistory.length) * 100
  );

  return (
    <div className="space-y-4">
      {/* Attendance Summary */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="flex items-center text-gray-900">
            <CheckSquare className="size-5 mr-2" />
            My Attendance
          </h2>
          <Badge className={`${attendancePercentage >= 75 ? 'bg-green-600' : 'bg-red-600'}`}>
            {attendancePercentage}%
          </Badge>
        </div>
        
        <div className="space-y-2">
          {mockAttendanceHistory.map((record, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Calendar className="size-4 text-gray-600" />
                <span className="text-gray-900">{record.date}</span>
              </div>
              <div className="flex items-center gap-2">
                {record.method !== '-' && (
                  <span className="text-xs text-gray-500">{record.method}</span>
                )}
                <span className={`px-3 py-1 rounded-full text-sm ${
                  record.status === 'Present' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {record.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Mark Attendance */}
      <Card className="p-6">
        <h2 className="text-gray-900 mb-4">Mark Today's Attendance</h2>
        
        <div className="space-y-4">
          {/* Camera Section */}
          <div>
            <label className="block mb-2 text-gray-700">Capture Selfie</label>
            {!selfieData ? (
              <div className="space-y-3">
                {isCameraActive ? (
                  <div className="relative">
                    <video
                      ref={videoRef}
                      autoPlay
                      className="w-full rounded-lg"
                    />
                    <Button
                      onClick={captureSelfie}
                      className="mt-3 w-full bg-green-600 hover:bg-green-700"
                    >
                      <Camera className="size-4 mr-2" />
                      Capture Photo
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={startCamera}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Camera className="size-4 mr-2" />
                    Open Camera
                  </Button>
                )}
              </div>
            ) : (
              <div>
                <img src={selfieData} alt="Selfie" className="w-full rounded-lg mb-3" />
                <Button
                  onClick={() => setSelfieData(null)}
                  variant="outline"
                  className="w-full"
                >
                  Retake Photo
                </Button>
              </div>
            )}
          </div>

          {/* Location Section */}
          <div>
            <label className="block mb-2 text-gray-700">Current Location</label>
            {location ? (
              <div className="p-3 bg-green-50 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 text-green-600" />
                  <span className="text-green-900">{location}</span>
                </div>
                <Button onClick={() => setLocation(null)} variant="ghost" size="sm">
                  Change
                </Button>
              </div>
            ) : (
              <Button
                onClick={getLocation}
                className="w-full bg-indigo-600 hover:bg-indigo-700"
              >
                <MapPin className="size-4 mr-2" />
                Get Current Location
              </Button>
            )}
          </div>

          {/* Time Display */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 text-gray-700">
              <Clock className="size-4" />
              <span>Current Time: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmitAttendance}
            disabled={isSubmitting || !selfieData || !location}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {isSubmitting ? 'Submitting...' : 'Submit for Approval'}
          </Button>

          <div className="p-3 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-900">
              Your attendance will be marked as pending until approved by your class teacher.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
