import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Plants from './pages/Plants';
import AddPlant from './pages/AddPlant';
import PlantLists from './pages/PlantLists';
import PlantListDetail from './pages/PlantListDetail';
import Profile from './pages/Profile';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Public routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Protected routes */}
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Layout>
                                    <Dashboard />
                                </Layout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/plants"
                        element={
                            <ProtectedRoute>
                                <Layout>
                                    <Plants />
                                </Layout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/add-plant"
                        element={
                            <ProtectedRoute>
                                <Layout>
                                    <AddPlant />
                                </Layout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/plant-lists"
                        element={
                            <ProtectedRoute>
                                <Layout>
                                    <PlantLists />
                                </Layout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/plant-lists/:id"
                        element={
                            <ProtectedRoute>
                                <Layout>
                                    <PlantListDetail />
                                </Layout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Layout>
                                    <Profile />
                                </Layout>
                            </ProtectedRoute>
                        }
                    />

                    {/* Catch all route */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;