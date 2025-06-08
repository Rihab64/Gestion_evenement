
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/MainLayout";

const NotFound = () => {
  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="text-center px-4">
          <h1 className="text-6xl md:text-8xl font-display font-bold text-purple-600 dark:text-purple-400 mb-6">
            404
          </h1>
          <p className="text-2xl text-gray-700 dark:text-gray-300 mb-8">
            Oops! La page que vous cherchez n'existe pas.
          </p>
          <div className="max-w-md mx-auto mb-8 text-muted-foreground">
            <p>
              Il semble que vous ayez suivi un lien cassé ou que la page ait été
              déplacée ou supprimée.
            </p>
          </div>
          <Button asChild size="lg">
            <Link to="/">Retour à l'accueil</Link>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFound;
