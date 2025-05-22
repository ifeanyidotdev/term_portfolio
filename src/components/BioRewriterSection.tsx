
import type React from 'react';
import TerminalCommand from './TerminalCommand';
import BioRewriterForm from './BioRewriterForm';
import { Card, CardContent, CardHeader } from '@/components/ui/card';


const BioRewriterSection: React.FC = () => {
  return (
    <section id="bio-rewriter" aria-labelledby="bio-rewriter-heading">
       <Card className="bg-transparent border-none shadow-none">
        <CardHeader className="p-0 mb-6">
          <TerminalCommand command="run_ai_bio_rewriter" />
        </CardHeader>
        <CardContent className="p-0">
          <BioRewriterForm />
        </CardContent>
      </Card>
    </section>
  );
};

export default BioRewriterSection;
